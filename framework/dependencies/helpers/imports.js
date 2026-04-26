export const object = async (obj) => {
    await Promise.all(Object.entries(obj).map(async ([name, url]) => {
        if (typeof (obj[name]) === "string") {
            const module = await import(url)
            obj[name] =  module.default ?? module
        }
    }))
    return obj
}