export const getProp = (prop, dom = null) => {
    const validDom = dom || document.documentElement
    const validProp = prop.includes("--") ? prop : `--${prop}`
    return getComputedStyle(validDom).getPropertyValue(validProp)
}

export const getTimeProp = (prop, dom = null) => {
    const value = getProp(prop, dom).split(" ")[0]
    if (value.endsWith("ms")) return parseFloat(value)
    if (value.endsWith("s")) return parseFloat(value) * 1000
}