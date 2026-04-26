export let reg

export const createRegister = () => {
    if (!reg) {
        reg = {
            deps: { helper: new Map(), class: new Map() },
            comp: new Map(),
            ids: new Map()
        }
    } else {
        console.error("runtime: register already created")
    }
}

export const set = (item, value) => {
    if (!reg[item]) {
        console.error(`Register: ${item} is not a valid item`)
        return
    }
    if (!Array.isArray(value)) {
        console.error(`Register: needed value as array. ${item} Not registred`)
        return
    }
    reg[item].set(value[0], value[1])
}

export const get = (type, item) => { return reg[type].get(item) || null }

