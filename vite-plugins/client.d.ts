declare module "~openapi-server" {


    export function setup(callback: (ref: Requestor) => any);


    let ref: OpenAPIServer = {
        requestor: fetch
    };


    export function GetPets(params: any): ReturnType<>

    export function PostPets(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PatchPets(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function GetPetsById(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function DeletePetsById(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function GetItems(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PostItems(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PostBody(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PostDemoFormsMultipart(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PostDemoFormsMultipartWithFiles(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function PostDemoFormsUrlEncoded(params: any): ReturnType<OpenAPIServer["requestor"]>

    export function GetDemoFeedback(params: any): ReturnType<OpenAPIServer["requestor"]>
}