import { addGlobalLevel } from "./../../level/global/createGlobal.js"

const addStyles = (url) =>
    new Promise(resolve => {
        const newLink = document.createElement("link")
        newLink.rel = "stylesheet"
        newLink.href = url
        document.head.appendChild(newLink)
        newLink.onload = resolve
    })

const initModules = async (modules) => {
    await Promise.all(Object.values(modules).map(mod => mod.init()))
}

const init = async () => {
    await addGlobalLevel()
    const help = window.level.help
    const app = "./../../app/"
    const appStyles = {
        "conf": `${app}styles/conf.css`,
        "mainClasses": `${app}styles/mainClasses.css`,
        "mainContainers": `${app}/styles/mainContainers.css`
    }
    const demoModules = {
        "mainContainers": `${app}interface/loads/mainContainers.js`
    }

    /* iniciar animacion de carga */

    await Promise.all([
        ...Object.values(appStyles).map(style => addStyles(style)),
        help.import.all(demoModules)
    ])

    /* parar animacion */

    /* inicializar modulos 1º containers, 2º el resto de modulos en paralelo */
    initModules(demoModules)
}

await init()