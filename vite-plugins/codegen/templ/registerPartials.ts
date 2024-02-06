import * as fs from "fs";
import path from "path";

export default function registerPartials() {
    return new Promise((resolve, reject) => {
        fs.readdir(
            path.resolve(__dirname, "partials"),
            (err, partials) => {
                /*注册所有的 hbs */
                if (err) {
                    reject(null)
                    return;
                }
                partials.forEach((partial) => {
                    const res = fs.readFileSync(
                        path.resolve(__dirname, "partials", partial)
                    );
                    /*注册所有的分部*/
                    Handlebars.registerPartial(path.basename(partial) as string, res.toString())
                })
                resolve(null);
            })
    })

}