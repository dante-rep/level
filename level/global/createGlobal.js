import * as modules from "./../conf/paths.js"

const addToObject = async (obj) => {
    const imports = Object.entries(obj).map(async ([name, url]) => {
        obj[name] = await import(window.level.route + url)
    })
    await Promise.all(imports)
}

export const addGlobalLevel = async () => {
    window.level = {}
    window.level["route"] = window.location.pathname.split("/")[1] === "level" ? "/level" : ""
    window.level["help"] = { ...modules.help }
    await Promise.all([addToObject(window.level.help)])
}
