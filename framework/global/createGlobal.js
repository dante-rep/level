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
    /* helpers */
    const modulesPath = await import(`${window.level.route}/framework/conf/paths.js`)
    window.level["help"] = modulesPath.help
    await addToObject(window.level.help)
}
