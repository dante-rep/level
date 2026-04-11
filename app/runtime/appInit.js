import { addGlobalLevel } from "../../framework/global/createGlobal.js"
import conf from "../conf/app.js"

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
    await addGlobalLevel()

    const landing = {
        "module": `${window.level.route}/app/interface/loads/appLoad-landing.js`
    }
    const app = {
        "styles": {
            "conf": `${window.level.route}/app/styles/conf.css`,
            "mainClasses": `${window.level.route}/app/styles/mainClasses.css`,
            "mainContainers": `${window.level.route}/app//styles/mainContainers.css`
        },
        "modules": {
            "mainContainers": `${window.level.route}/app/interface/loads/mainContainers.js`
        }
    }

    loadStyles(app.styles)
    if (conf.developerMode) {
        await loadModules(landing)
        landing.module.init()
    }

    /*     await Promise.all([
            loadStyles(app.styles),
            loadModules(app.modules)
        ])
     */
    await new Promise(resolve => setTimeout(resolve, 1000))
/*     initInterface(app.modules)
 */}

await init()