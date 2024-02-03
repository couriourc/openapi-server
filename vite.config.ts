import {defineConfig} from "vite";
import SwaggerMockPlugin from "./vite-plugins";
import * as path from "path";

const camelCase = (str) => {
    str = str?.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}
export default defineConfig({
    plugins: [
        SwaggerMockPlugin({
            api: "",
            url: path.resolve(__dirname, "openapi.json"),
            rewrite: {
                operationId(api) {
                    return camelCase(api.method) + api.path.replace('/api/v3/', '')
                        .replace(/-/g, "/")
                        .replace(":", "/By/")
                        .replace(" ", "/")
                        .replace(/\s/g, "")
                        .split("/")
                        .map(camelCase).join("");
                }
            },
        })
    ]
})