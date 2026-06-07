const checkLevel = () => {
    if (!globalThis.level) {
        console.error("level as gloval not exists")
        return null
    }
    return true
}

/* const getCompData = (componentsList, tag) => {
    const componentInfo = componentsList[tag]
    return componentInfo
}
 */
const validateConfig = async (config, componentsList) => {
    const error = (log) => {
        console.error(config.class, log)
        return null
    }

    if (!(config.class in componentsList)) { return error("❌ not found in components conf-list") }
    if (!config.id) { return error("❌ no id in component config") }
    /*     if (validateId(config.id)) { return error(`❌ id already in use ${register.reg.ids.get(config.id)}`) }
     */
    return true
}

const importComponent = () => {

}

const register = (config, componentInfo, registerMod, infoLists) => {
    /* register component */
    const regComponent = registerMod.getReg("component", componentInfo)
    if (!regComponent) {
        console.log(infoLists)
        registerMod.setReg("components", config.class, {
            'componentID': config.id,
            'classes': componentInfo.class,
            'helpers': componentInfo.helper,
            'module': componentInfo.module,
        })
    }

    console.log(componentInfo, config)

    /* register component class */
    componentInfo.class.forEach(item => {
        const regClass = registerMod.getReg("classes", item)
        if (!regClass) {
            registerMod.setReg("classes", item, {
                'name': item,
/*                 'module': 
 */            })
        }
    })
}












/* ---------------------------------------------------------------- */

const importModules = async (config, compInfo) => {
    const registred = register.reg.comp.get(compInfo.tag)
    if (!registred) {
        const module = await import(`${level.route}${compInfo.path}`)
        return module
    }
    return registred.module
}

const importDependencies = async (config, compInfo, infoLists) => {
    const dependencies = {}
    const createObject = async (type) => {
        const reg = register.reg.deps
        dependencies[type] = {}

        for (const item of compInfo[type]) {
            const registred = reg[type].get(item)
            if (!registred) {
                dependencies[type][item] = type === "class"
                    ? await import(`${level.route}${infoLists.deps[type][item]}`)
                    : infoLists.deps[type][item]
            }
        }
    }
    await Promise.all([
        createObject("class"),
        createObject("helper")
    ])
    return dependencies
}

const addToReg = async (config, module, dependencies) => {
    const components = register.reg.comp
    const classes = register.reg.deps.class
    const helper = register.reg.deps.helper
    const registred = (reg, item) => { return reg.get(item) }
    const registerBy = (reg, item, value) => { reg.get(item)["usedBy"].push(value) }

    /* component */
    const componentReg = registred(components, config.class)
    !componentReg && components.set(config.class, { 'module': module, 'usedBy': [], 'deps': { 'class': dependencies.class, 'helper': dependencies.helper } })
    components.get(config.class)["usedBy"].push(config.id)
    /* dependencies class */
    Object.keys(dependencies.class).forEach(item => {
        const classReg = registred(classes, item)
        !classReg && classes.set(item, { 'instance': new dependencies.class[item].default(), 'usedBy': [] })
        classes.get(item)["usedBy"].push(config.id)
    })
    /* dependencies helper */
    Object.keys(dependencies.helper).forEach(item => {
        const helperReg = registred(helper, item)
        !helperReg && helper.set(item, { 'module': dependencies.helper[item], 'usedBy': [] })
        helper.get(item)["usedBy"].push(config.id)
    })
}

const injectDependencies = (component, list) => {
    const requiredDeps = component.requiredDeps
    let registeredDeps = {}

    requiredDeps.forEach(item => {
        const reg =
            register.reg.deps.class.get(item) ||
            register.reg.deps.helper.get(item)
        !reg && console.error(`❌ ${component.id} not found ${item} in:`, list)
        reg && (registeredDeps[item] = reg.module || reg.instance)
    })
    component.deps = registeredDeps
}

const validateId = (id) => {
    const uniqueId = register.reg.ids.get(id) || null
    return uniqueId
}

const registerID = (component) => {
    register.reg.ids.set(component.id, { "component": component })
}

const applyConf = (component, config) => {
    component.id = config.id
    config.css && component.css && (component.css = config.css)
    config.logic && component.logic && (component.logic = config.logic)
    config.eventDom && component.eventDom && (component.eventDom = config.eventDom)
    config.eventName && component.eventName && (component.eventName = config.eventName)
    config.fonts && component.fonts && (component.fonts = config.fonts)
    config.links && component.links && (component.links = config.links)
    config.data && component.data && (component.data = config.data)
    config.state && component.state && (component.state = config.state)
    config.className && component.className && (component.className = config.className)
}
/* ---------------------------------------------------------------- */


export const prepare = async (box, config, classes = null) => {
    /* check global */
    if (checkLevel()) {

        /* lists and registry module */
        let [componentsList, dependenciesList, registerMod] = await Promise.all([
            import(`${level.route}/framework/conf/components_paths.js`),
            import(`${level.route}/framework/conf/dependencies_paths.js`),
            import(`${level.route}/framework/runtime/register.js`)
        ])
        componentsList = componentsList.default
        dependenciesList = dependenciesList.default
        const componentInfo = componentsList[config.class]

        /* validate config */
        const validConfig = await validateConfig(config, componentsList)
        if (!validConfig) return null

        /* imports */


/*         register(config, componentInfo, registerMod, infoLists)
 */

        /*         if (!validateConfig(componentInfo, infoLists, register)) return
         */        /* register component */
/*         register(config, componentInfo, registerMod, infoLists)
 */



        /* import modules */
/*         const [module, dependencies] = await Promise.all([
            importModules(config, compInfo),
            importDependencies(config, compInfo, infoLists)
        ])
 */        /* register module & deps */
/*         addToReg(config, module, dependencies)
 */        /* create component */
/*         let component = register.reg.comp.get(config.class)
        component = box.appendChild(new component.module.default())
 */        /* register id */
/*         registerID(config.id)
 */        /* apply conf */
/*         applyConf(component, config)
 */        /* inject dependencies */
/*         injectDependencies(component, infoLists.deps)
 */     return component
    }
}

export const init = async (box, config) => {
    const component = await load(box, config)
    await component.init()
    return component
}