/*generator the declaration*/
/**/
import {IGenDeclaration} from "./__type__/genDeclaration";
import Handlebars from "handlebars";
import * as fs from "fs";
import path from "path";


export function genDeclaration(param: IGenDeclaration): Promise<string> {

    const template = Handlebars.compile(fs.readFileSync(path.resolve(__dirname, "templ/declaration.hbs")).toString())

    return new Promise((resolve, reject) => {
        try {
            resolve(template(param));
        } catch {
            reject(`{Error},${genDeclaration.name}`)
        }
    })
}