/* import { addGlobalLevel } from "../../framework/global/createGlobal.js"
 */import * as levelFrame from "../../framework/runtime/init.js"
import conf from "../conf/app.js"

const addStyles = (url) => {
    return new Promise(resolve => {
        const newLink = document.createElement("link")
        newLink.rel = "stylesheet"
        newLink.href = url
        document.head.appendChild(newLink)
        newLink.onload = async () => { /* puto css */
            await new Promise(requestAnimationFrame)
            await new Promise(requestAnimationFrame)
            resolve()
        }
    })
}

const initInterface = async (modules) => {
    await Promise.all(Object.values(modules).map(mod => mod.init()))
}

const loadStyles = async (styles) => {
    await Promise.all(Object.values(styles).map(style => addStyles(style)))
}

const loadModules = async (modules) => {
    return await level.helper.import.object(modules)
}

const init = async () => {
    /* load level */
    const levelFrame = await import("../../framework/runtime/init.js")
    await levelFrame.init()

    /* load shared styles */
    const styles = {
        "conf": `${level.route}/app/styles/conf.css`,
        "mainClasses": `${level.route}/app/styles/mainClasses.css`,
        "mainContainers": `${level.route}/app//styles/mainContainers.css`
    }
    await loadStyles(styles)

    /* load landing */
    if (conf.developerMode) {
        const landing = await loadModules({ "module": `${level.route}/app/interface/loads/appLoad-landing.js` })
        await landing.module.init()
    }

    /* load interface modules */
    const modules = {
        "mainContainers": `${level.route}/app/interface/loads/mainContainers.js`
    }
    const steps = 5
    const animation = true
    if (animation) {
        for (let i = 1; i <= steps; i++) {
        document.dispatchEvent(new CustomEvent("appLoad", { detail: { 'progress': Math.round(i * (100 / steps)) } }))
/*             await new Promise(resolve => setTimeout(resolve, 2000))
 */        }
    }

    /*     await Promise.all([
            loadModules(app.modules)
        ])
     */
    await new Promise(resolve => setTimeout(resolve, 1000))
/*     initInterface(app.modules)
 */}

await init()