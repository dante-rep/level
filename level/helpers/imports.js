export const object = async (obj) => {
    await Promise.all(Object.entries(obj).map(async ([name, url]) => {
        (typeof(obj[name]) === "string") && (obj[name] = await import(url))
    }))
    return obj
}