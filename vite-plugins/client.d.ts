declare module "~openapi-server" {
interface Requestor {
  requestor: any
}
export function setup(callback:(ref:Requestor)=>any);


let ref:Requestor = {
  requestor: fetch
};

export  function GetPets():ReturnType<typeof ref.requestor>;
export  function PostPets():ReturnType<typeof ref.requestor>;
export  function PatchPets():ReturnType<typeof ref.requestor>;
export  function GetPetsById():ReturnType<typeof ref.requestor>;
export  function DeletePetsById():ReturnType<typeof ref.requestor>;
export  function GetItems():ReturnType<typeof ref.requestor>;
export  function PostItems():ReturnType<typeof ref.requestor>;
export  function PostBody():ReturnType<typeof ref.requestor>;
export  function PostDemoFormsMultipart():ReturnType<typeof ref.requestor>;
export  function PostDemoFormsMultipartWithFiles():ReturnType<typeof ref.requestor>;
export  function PostDemoFormsUrlEncoded():ReturnType<typeof ref.requestor>;
export  function GetDemoFeedback():ReturnType<typeof ref.requestor>;
}