export let register = null

export const initRegister = () => {
    !register && (register = {
        helper: new Map(),
        class: new Map(),
        components: new Map(),
        ids: new Map()
    })
    register && console.error("runtime: register already initialized")
}

export const setInfo = (reg, item, value) => {
    register[reg].set(item, value)
}

export const addInfo = (reg, item, key, value) => {
    const previousReg = register[reg].get(item)
    previousReg[key] = value
}

export const getInfo = (reg, item, key = null) => {
    const info = register[reg].get(item)
    return key
        ? info?.[key] || null
        : info || null
}