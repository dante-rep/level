import { addGlobalLevel } from "./../../level/global/createGlobal.js"

const addStyles = (url) => {
    new Promise(resolve => {
        const newLink = document.createElement("link")
        newLink.rel = "stylesheet"
        newLink.href = url
        document.head.appendChild(newLink)
        newLink.onload = resolve
    })
}

const initInterface = async (modules) => {
    await Promise.all(Object.values(modules).map(mod => mod.init()))
}

const loadStyles = async (styles) => {
    await Promise.all(Object.values(styles).map(style => addStyles(style)))
}

const loadModules = async (modules) => {
    return await window.level.help.import.object(modules)
}

const init = async () => {
    const path = "./../../../app/"
    const landing = {
        "module": `${path}interface/loads/appLoad-landing.js`
    }
    const app = {
        "styles": {
            "conf": `${path}styles/conf.css`,
            "mainClasses": `${path}styles/mainClasses.css`,
            "mainContainers": `${path}/styles/mainContainers.css`
        },
        "modules": {
            "mainContainers": `${path}interface/loads/mainContainers.js`
        }
    }

    await Promise.all([
        addGlobalLevel(),
        loadStyles(app.styles)
    ])

    await loadModules(landing)
    landing.module.init()

    /*     await Promise.all([
            loadStyles(app.styles),
            loadModules(app.modules)
        ])
     */
    await new Promise(resolve => setTimeout(resolve, 1000))
/*     initInterface(app.modules)
 */}

await init()