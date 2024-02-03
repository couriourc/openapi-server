import './style.css'
import {GetItems, setup} from '~openapi-server'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


setup((ref) => {
    // 使用原生 fetch
    ref.requestor = (...params: any[]) => fetch(...params);
    // 使用axios
    // ref.requestor = (...params) => axios.get(...params);
})

console.log(
    GetItems().then(()=>{

    })
)