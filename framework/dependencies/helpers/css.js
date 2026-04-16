export const getVar = (prop, dom = null) => {
    const validDom = dom || document.documentElement
    const validProp = prop.includes("--") ? prop : `--${prop}`
    return getComputedStyle(validDom).getPropertyValue(validProp)
}

export const getElementProp = (element, prop) => {
    return getComputedStyle(element).getPropertyValue(prop)
}
