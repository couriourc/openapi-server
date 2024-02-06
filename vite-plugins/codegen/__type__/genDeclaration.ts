import {FakeGenOutput} from "../../core/__types__/common";

export interface IGenDeclaration {
    moduleName: string;
    apis: FakeGenOutput[];
}