export let register = null

export const initRegister = () => {
    if (!register) {
        register = {
            classes: {},
            helpers: {},
            components: {}
        }
        return
    }
    console.error("runtime: register already initialized")
}

export const setReg = (reg, item, value) => {
    register[reg][item] = value
    /* dont need validation */
}

export const addReg = (reg, item, key, value) => {
    const previousReg = register[reg]?.[item] || null
    previousReg
        ? previousReg[key] = value
        : console.error("register", `${item} not found`)
}

export const getReg = (reg, item, key = null) => {
    return key
        ? register[reg]?.[item]?.[key] || null
        : register[reg]?.[item] || null
}