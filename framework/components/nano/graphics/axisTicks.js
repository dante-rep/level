export const tag = "axis-ticks"
export default class AxisTicks extends HTMLElement {
    /* private props */
    #STATE = null
    #DEPS = ["base", "dom"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
    }
    #LOGIC = {

    }
    #DATA = {

    }

    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = { 'text': "some text" }
        this.fonts = null /* [{}] */
        this.css = {}
        this._css = { ...this.#CSS }
        this.logic = {}
        this._logic = { ...this.#LOGIC }
        this.data = {}
        this._data = { ...this.#DATA }
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max")
        this.mainBox.innerHTML = `
        <ul class="axisBar"></ul>
        `
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }

        :host {
            display: flex;
            width: var(--box_width);
            height: var(--box_height);
            border: 1px solid red;
        }

        .mainBox {

        }
        `
    }

    #configure() { this.deps.base.validateAll(this) }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.#STATE = ready
    }

    /* public methods */
    getState() { return this.#STATE }

    updateCss(css) {
        this.deps.base.convertCssVar(css, this)
    }

    load() {
        this.#checkConf()
    }

    async init() {
        this.load()
        if (this.#STATE) {
            this.#configure()
            this.#addStyle()
            this.#drawComponent()
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, cube3D)