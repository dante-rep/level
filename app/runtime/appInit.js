import { addGlobalLevel } from "./../../level/global/createGlobal.js"

const importDemoModules = async (help) => {
    const demoModules = {
        "mainContainers": "./../../app/interface/demo/loads/mainContainers.js"
    }
    await help.import.all(demoModules)
    return demoModules
}

const initModules = async (modules) => {
    await Promise.all(Object.values(modules).map(mod => { mod.init() }))
}

const init = async () => {
    await addGlobalLevel()
    const help = window.level.help
    const demoModules = await importDemoModules(help)
    console.log(demoModules)

    await initModules(demoModules)
}

await init()