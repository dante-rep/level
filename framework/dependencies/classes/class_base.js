class ClassBase {
    /* RESOLVE EXTERNAL CONFIG */
    #resolve(object, defaultOBJECT, dom) {
        const resumed = { ...defaultOBJECT }
        if (object !== null) {
            Object.entries(object).forEach(([prop, value]) => {
                prop in resumed
                    ? resumed[prop] = value
                    : console.error([dom], prop, `❌ Not valid prop - will not be used`)
            })
        }
        return resumed
    }

    #resolveCSS(css, defaultCSS, dom) {
        const resumed = this.#resolve(css, defaultCSS, dom)
        this.convertCssVar(resumed, dom)
        return resumed
    }

    #resolveDATA(data, defaultDATA, dom) {
        const resumed = this.#resolve(data, defaultDATA, dom)
        return resumed
    }

    #resolveLOGIC(logic, defaultLOGIC, dom) {
        const resumed = { ...defaultLOGIC }
        Object.entries(defaultLOGIC).forEach(([prop, value]) => {
            resumed[prop] = value[0]
        })
        if (logic !== null) {
            Object.entries(logic).forEach(([prop, value]) => {
                prop in resumed
                    ? defaultLOGIC[prop].includes(value)
                        ? resumed[prop] = value
                        : console.error([dom], prop, `⚠️ Invalid value, will be used default 🔄 ${resumed[prop]}`)
                    : console.error([dom], prop, `❌ Not valid prop - will not be used`)
            })
        }
        return resumed
    }

    validateAll(dom) {
        dom._css && (dom.css = this.#resolveCSS(dom.css, dom._css, dom))
        dom._logic && (dom.css = this.#resolveLOGIC(dom.logic, dom._logic, dom))
        dom._data && (dom.css = this.#resolveDATA(dom.data, dom._data, dom))
    }

    /* CSS PROPS*/
    convertCssVar(css, dom) {
        Object.entries(css).forEach(([prop, value]) => dom.style.setProperty(`--${prop}`, value))
    }
}

export default new ClassBase()