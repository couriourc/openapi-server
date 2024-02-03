import {loadConfig} from 'unconfig'
import {ISwaggerMockOption} from ".";

export const resolvedConfig = loadConfig<ISwaggerMockOption>({
        sources: [
            {
                files: 'swagger-mocker.config',
                // default extensions
                extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
            },
            {
                files: 'package.json',
                extensions: [],
                rewrite(config) {
                    /*@ts-ignore*/
                    return config?.swaggerMocker
                },
            },
            {
                files: 'vite.config',
                async rewrite(config) {
                    const resolved = await (typeof config === 'function' ? config() : config)
                    return resolved?.swaggerMocker
                },
            },
        ],
        merge: false,
    },
)