const addToObject = async (obj, route) => {
    await Promise.all(
        Object.entries(obj).map(async ([name, value]) => {
            if (typeof value === "string") {
                const path = route === "" ? value : route + value
                obj[name] = await import(path)
            } 
            if (typeof value === "object") {
                await addToObject(value, route)
            }
        })
    )
}

export const addGlobalLevel = async () => {
    const serverPath = "level"
    const level = {}
    /* route */
    level["route"] = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    /* dependencies */
    const dependencies = (await import(`${level.route}/framework/conf/dependencies_paths.js`)).default
    await addToObject(dependencies.helper, level.route)
    level["helper"] = dependencies.helper
    /* global assign */
    globalThis.level = level
}