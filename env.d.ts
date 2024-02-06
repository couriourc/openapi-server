/// <reference path="./vite-plugins/client.d.ts"/>

declare module "~openapi-server" {
    import axios from "axios";

    export interface OpenAPIServer {
        requestor: axios.Axios;
    }
}