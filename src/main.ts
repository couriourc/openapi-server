import './style.css'
import {GetItems, setup} from '~openapi-server'
import axios from "axios";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


const instance = axios.create({});
setup((ref) => {
    // 使用原生 fetch
    // 使用axios
    ref.requestor = (params) => {
        console.log(params)
        return fetch(params)
    }
    // ref.requestor = (...params) => instance({
    //     ...params
    // });
})

console.log(
    GetItems({})

        .then((res) => {
            return res.text()
        })
        .then((text) => {
            console.log(text)
        })
)