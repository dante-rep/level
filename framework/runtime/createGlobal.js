const addToObject = async (obj, route) => {
    await Promise.all(
        Object.entries(obj).map(async ([name, url]) => {
            obj[name] = route === ""
                ? await import(url)
                : await import(route + url)
        })
    )
}

const addGlobalLevel = async () => {
    const serverPath = "level"
    const level = {}
    /* route */
    level["route"] = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    console.log("global - route:", level.route)
    /* dependencies */
    const dependencies = (await import(`${level.route}/framework/conf/dependencies_paths.js`)).default
    await addToObject(dependencies.helper, level.route)
    level["class"] = dependencies.classes
    level["helper"] = dependencies.helper
    /* global assign */
    globalThis.level = level
}

await addGlobalLevel()