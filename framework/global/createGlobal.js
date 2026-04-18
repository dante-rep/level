const addToObject = async (obj) => {
    const imports = Object.entries(obj).map(async ([name, url]) => {
        obj[name] = window.level.route === ""
            ? await import(url)
            : await import(`${window.level.route}${url}`)
    })
    await Promise.all(imports)
}

export const addGlobalLevel = async () => {
    const serverPath = "level"
    window.level = {}
    /* route */
    window.level["route"] = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    console.log("global - route:", window.level.route)
    /* dependencies */
    const dependencies = (await import(`${window.level.route}/framework/conf/dependencies_paths.js`)).default
    window.level["deps"] = {}
    window.level.deps["classes"] = dependencies.classes
    window.level.deps["helpers"] = dependencies.helpers
    await addToObject(window.level.deps.helpers)
}
