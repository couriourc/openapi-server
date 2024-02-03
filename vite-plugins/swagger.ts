import {
    fetchRemoteSpec,
    getFileTypeByPath,
    getInputByJson,
    getInputByYaml,
    hasHttpOrHttps,
    isRemoteData
} from "./core/utils";
import {IOpenAPI} from "./core/__types__/OpenAPI";
import * as fs from "fs";

export class Swagger {
    static fromURL(url: string) {
        // @ts-ignore
        return fetchRemoteSpec(url).then((resp) => {
            if (isRemoteData(resp)) {
                return resp.fileType === "yaml" ?
                    getInputByYaml(resp.data) :
                    resp.data as unknown as IOpenAPI
            }
        })
    }

    static fromFile(file: string) {
        const fileType = getFileTypeByPath(file);
        const fileStr = fs.readFileSync(file, "utf8");
        return fileType == "yaml" ? getInputByYaml(fileStr) : getInputByJson(fileStr)
    }

    static async from(filePath: string) {
        if (hasHttpOrHttps(filePath)) {
            return Swagger.fromURL(filePath);
        }
        return Swagger.fromFile(filePath)
    }
}