export const secuencial = async (array, box) => {
    for (const item of array) {
        if (typeof item !== "object") {
            console.error(`❌ ${item} is not an object`)
            return
        }
        if (!item.text || !item.type || !item.animation || !item.box) {
            console.error(`❌ ${item} is not valid animation configuration`)
            return
        }
        if (!level.helper.animations[item.type][item.animation]) {
            console.error(`❌ ${item.animation} is not a valid animation`)
            return
        }
        await simple[item.type][item.animation](item)
    }
}

export const simple = async (conf, box) => {
    await level.visual.animations[conf.type][conf.animation](conf)
}