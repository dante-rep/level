const addToObject = async (obj, route, modeClass = false) => {
    await Promise.all(
        Object.entries(obj).map(async ([name, value]) => {
            if (typeof value === "string") {
                const path = route === "" ? value : route + value
                modeClass
                    ? obj[name] = path
                    : obj[name] = await import(path)
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
    const levelMap = ["route", "class", "helper", "visual"]
    levelMap.map(item => level[item] = {})
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route
    /* import modules */
    const modules = (await import(`${level.route}/framework/conf/dependencies_paths.js`)).default
    /* class */
    level.class = modules.class
    const modeClass = true
    await addToObject(level.class, level.route, modeClass)
    /* helpers */
    level.helper = { ...modules.helper }
    await addToObject(level.helper, level.route)
    /* visual */
    level.visual = { ...modules.visual }
    await addToObject(level.visual, level.route)
    /* global assign */
    globalThis.level = level
}