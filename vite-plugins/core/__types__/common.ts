import {ISchema} from "./OpenAPI";

export interface SchemaWithoutRef extends ISchema {
    not?: ISchema;
    allOf?: Array<ISchema>;
    oneOf?: Array<ISchema>;
    anyOf?: Array<ISchema>;
    items?: ISchema;
    properties?: {
        [k: string]: ISchema;
    };
    propertyNames?: ISchema;
    additionalProperties?: ISchema | boolean;
}

export interface FakeGenOutput {
    operationId: string;
    path: string;
    method: string;
    summary?: string;
    mocks?: any;

    responses: any;

    parameters?: any;
}

export interface GenSchema extends FakeGenOutput {
    response: [

    ],
    request: {
        name: string;
        required?: boolean;
        description?: string;
        default: any;

    }[

    ]
}