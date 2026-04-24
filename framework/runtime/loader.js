const checkLevel = () => {
    if (!globalThis.level) {
        console.error("level as gloval not exists")
        return false
    } else {
        return true
    }
}

const importLoaderDeps = async () => {
    const infoLists = {
        "comp": `${level.route}/framework/conf/components_paths.js`,
        "deps": `${level.route}/framework/conf/dependencies_paths.js`,
    }
    await level.helper.import.object(infoLists)
    return infoLists
}

const checkId = (id) => {
    return window.APP.ids_reg[id]
}

const addRegId = (component) => {
    window.APP.ids_reg[component.id] = { "id": component.id, "component": component }
}

const importModules = async (config, componentData) => {
    const old = comp_reg.get(config.tag)
    if (!old) {
        const module = await import(`${window.APP.route}${componentData.module}`)
        return module.default
    }
    if (old) return old.mod
}

const importDependencies = async (module) => {
    const dependencies = module.requiredDeps
    const deps = await Promise.all(dependencies.map(async (item) => {
        const old = deps_reg.get(item)
        if (!old) {
            const url = info.deps.list[item]
            return { "class": (await import(`${window.APP.route}${url}`)).default }
        }
        if (old) return { "class": old.class }
    }))
    return deps
}

const addReg = async (config, module, dependencies) => {
    const oldModule = comp_reg.get(config.tag)
    !oldModule && comp_reg.set(config.tag, { "mod": module, "deps": module.requiredDeps, "usedBy": [] })
    dependencies.forEach(dep => {
        const oldDependency = deps_reg.get(dep.class.name)
        !oldDependency && deps_reg.set(dep.class.name, { "class": dep.class, "instance": null, "usedBy": [] })
    })
}

const addRegDeps = (dependencies) => {
    dependencies.forEach(dep => {
        const reg = deps_reg.get(dep.class.name)
        !reg.instance && (reg.instance = new reg.class())
    })
}

const injectDependencies = (component, deps) => {
    deps.forEach(item => component.deps[item] = deps_reg.get(item).instance)
}

const validateConfig = (config) => {
    const error = (log, prop = null,) => { console.error(prop || "", log) }
    if (!config) { error("❌ no configured"); return }
    if (!info.comp.list[config.tag]) { error("❌ no tag in component config"); return }
    if (!config.id) { error("❌ no id in component config", config.tag); return }
    if (checkId(config.id)) { error(`❌ id already in use ${window.APP.ids_reg[config.id]}`, config.id); return }
    if (!config.eventName) { error(`❌ no eventName defined`, config.id); return }
    const componentData = info.comp.list[config.tag]
    if (!componentData) { error("❌ not found in component list", config.tag,); return }
    return componentData
}

const applyConf = (component, config) => {
    component.id = config.id
    component.css = config.css || null
    component.logic = config.logic || null
    config.eventDom && (component.eventDom = config.eventDom)
    config.eventName && (component.eventName = config.eventName)
    config.links && (component.links = config.links)
    config.data && (component.data = config.data)
    config.state && (component.state = config.state)
    config.className && (component.className = config.className)
}

export const load = async (box, config) => {
    /* check global */
    if (checkLevel()) {

        /* loads */
        const infoLists = await importLoaderDeps()

        /* validations */
        /*     const componentData = validateConfig(config)
            if (!componentData) return
         */
        /* import modules */
        /*     const module = await importModules(config, componentData)
            const dependencies = await importDependencies(module)
         */
        /* create component */
        /*     const component = box.appendChild(document.createElement(config.tag))
         */    /* apply conf */

        /*     applyConf(component, config)
         */    /* register */

        /*     await addReg(config, module, dependencies)
            addRegDeps(dependencies)
            addRegId(component)
         */
        /* inject dependencies */
        /*     injectDependencies(component, module.requiredDeps)
            return component
         */
    }

}

export const init = async (box, config) => {
    const component = await load(box, config)
    await component.init()
    return component
}