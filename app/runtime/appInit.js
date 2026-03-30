import { addGlobalLevel } from "./../frame/global/createGlobal.js"


const init = async () => {
    await addGlobalLevel()
    console.log(window.level)
}

await init()