const addToObject = async (obj) => {
    const imports = Object.entries(obj).map(async ([name, url]) => {
        obj[name] = level.route === ""
            ? await import(url)
            : await import(`${level.route}${url}`)
    })
    await Promise.all(imports)
}

export const addGlobalLevel = async () => {
    const serverPath = "level"
    globalThis.level = {}
    /* route */
    level["route"] = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    console.log("global - route:", level.route)
    /* dependencies */
    const dependencies = (await import(`${level.route}/framework/conf/dependencies_paths.js`)).default
    level["deps"] = {}
    level.deps["classes"] = dependencies.classes
    level.deps["helpers"] = dependencies.helpers
    await addToObject(level.deps.helpers)
}
