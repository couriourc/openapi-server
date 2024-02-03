import type {Plugin, ResolvedConfig} from 'vite'
import {resolvedConfig} from "./config";
import * as _ from "lodash";
import {ISwaggerMockPluginOption} from "./__types__";
import {Swagger} from "./swagger";
import {fakerGen} from "./core";
import {IOpenAPI} from "./core/__types__/OpenAPI";
import {FakeGenOutput} from "./core/__types__/common";
import {Recorder, TRecordId} from "./recorder";
import * as fs from "fs";
import path from "path";
import Mustache from "mustache";

function rewriteHandle(apis: FakeGenOutput[], option: ISwaggerMockPluginOption) {
    const rewrite = option['rewrite'];

    if (!rewrite) return;
    const rewriteFns = Object.entries(rewrite);
    if (!rewriteFns.length) return;
    apis.forEach((api, index) => {
        rewriteFns.forEach(([matchKey, executor]) => {
            api[matchKey as keyof FakeGenOutput] = executor(api, index);
        })
    });
}

//  写入声明文件
function writeDeclare(apis: FakeGenOutput[], option: ISwaggerMockPluginOption, moduleName: string) {
    fs.readFile(path.resolve(__dirname, 'templ/declare.mustache'), (err, data) => {
        if (err) return;
        fs.writeFile(path.resolve(__dirname, 'client.d.ts'), Mustache.render(data.toString(), {
            id: moduleName,
            apis: apis,
        }), {
            flag: "w+"
        }, (err) => {
            if (err) throw Error();
        })
    })
}

export default function SwaggerMockPlugin(option: ISwaggerMockPluginOption): Plugin {
    const virtualModuleId = [
        /^virtual:openapi-server$/,
        /^~openapi-server/,
        /^@openapi-server$/,
    ];
    const resolvedVirtualModuleId = '\0' + '~openapi-server.tsx';
    let config: ResolvedConfig;
    let swaggerObj: IOpenAPI;
    let recorder: Recorder;
    let apis: FakeGenOutput[];
    let importerId: string;
    let middlewareMap: Map<TRecordId, FakeGenOutput> = new Map<TRecordId, FakeGenOutput>();
    // 预解析获得文档
    return {
        name: 'vite-plugin-openapi-server',
        async config(config, {}) {
            return _.merge(config, await resolvedConfig);
        },
        async configResolved(resolvedConfig) {
            config = resolvedConfig;

        },
        configureServer(server) {
            /*处理服务请求用作 mock*/
            server.middlewares.use((req, res, next) => {
                if (/^\/api\/v3/.test(req.url as string)) {
                    const target = middlewareMap.get(Recorder.id({
                        method: req.method!,
                        path: req.url!,
                    }));
                    if (target) {
                        res.setHeader('Content-Type', 'application/json');
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            "code": 1,
                            "message": "success",
                            "data": target.mocks,
                        }));
                    }

                    return
                }
                next()
            })
        },
        async load(id: string) {
            if (id === resolvedVirtualModuleId) {
                if (!option.url) return;
                swaggerObj = await Swagger.from(option.url) as IOpenAPI;
                apis = await fakerGen(swaggerObj, false)
                if (!apis) return;
                recorder = Recorder.init(apis);
                apis.forEach((api) => {
                    middlewareMap.set(Recorder.id(api), api);
                })
                // 覆盖原本的参数
                rewriteHandle(apis, option);
                writeDeclare(apis, option, importerId);
                /*生成对象声明*/
                // 1. 注入运行时的请求体
                // 2. 生成请求对象类型声明
                // 3. 补充类型生成类型提示 | 生成 ts 声明
                /**
                 * @desc `{{description}}`
                 * {{#each param in params}}
                 * @params {`{{param.format}}`} `{{param.name}}` `{{param.summary}}`
                 * {{/each}}
                 * @return `{{returnType}}`
                 * */

                return `
                const ref = {
                    requestor: fetch   
                };
                export function setup(callback){
                    callback(ref);
                }
                ${
                    apis.map((api) => {
                        return `
                            export async function ${api.operationId?.replace(/\s/g, "")}(params){
                                return ref.requestor("${api.path}",{
                                    method: "${api.method}",
                                    data: params,
                                })
                            }
                        `
                    }).join(";")
                }
                `
            }
            return
        },
        resolveId(id: string) {
            if (virtualModuleId.some(idReg => idReg.test(id))) {
                importerId = id;
                return resolvedVirtualModuleId
            }
            return id
        }

    }
}