export const tag = "adaptative-grid"
export default class AdaptativeGrid extends HTMLElement {
    /* private props */
    #STATE = null
    #DEPS = ["base", "dom"]
    #CSS = {
        cell_width: "80px",
        cell_height: "80px",
        cell_borderColor: "grey"
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
        this.fonts = [] /* [{}] */
        this.css = {}
        this._css = { ...this.#CSS }
        this.logic = {}
        this._logic = { ...this.#LOGIC }
        this.data = {}
        this._data = { ...this.#DATA }
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
        this.autoResize = false
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max center")
        this.mainBox.innerHTML = `<ul class="centerMain"></ul>`
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            user-select: none;
            list-style: none;
        }

        :host {
            width: 100%;
            height: 100%;
        }

        .mainBox {

            .centerMain {

                .row {
                    display: flex;

                    .cell {
                        width: var(--cell_width);
                        height: var(--cell_height);
                        border-top: 1px solid var(--cell_borderColor);
                        border-left: 1px solid var(--cell_borderColor);
                        transition: 1s;
                    }
                }
            }
        }

        .max {width: 100%; height: 100%}
        .center {display: flex; justify-content: center; align-items: center;}
        `
    }

    #calculeGrid() {
        const cellWidth = Number(parseFloat(this.css.cell_width))
        const cellHeight = Number(parseFloat(this.css.cell_height))
        const rowsNum = Math.floor(this.mainBox.offsetHeight / cellWidth)
        const cellPerRow = Math.floor(this.mainBox.offsetWidth / cellHeight)
        return { 'rowsNum': rowsNum, 'cellPerRow': cellPerRow }
    }

    #drawGrid() {
        const centerMain = this.mainBox.querySelector(".centerMain")
        const calculed = this.#calculeGrid()
        console.log(calculed)

        for (let row = 0; row <= calculed.rowsNum; row++) {
            const newRow = this.deps.dom.add(centerMain, "li", "row max")

            for (let cell = 0; cell <= calculed.cellPerRow; cell++) {
                const newCell = this.deps.dom.add(newRow, "div", "cell")
            }
        }
    }

    #activeResize() {
        let lastCalculed = { old: this.#calculeGrid() }
        const centerMain = this.mainBox.querySelector(".centerMain")

        window.addEventListener("resize", () => {
            const newCalculed = this.#calculeGrid()
            if (lastCalculed.old.rowsNum !== newCalculed.rowsNum || lastCalculed.old.cellPerRow !== newCalculed.cellPerRow) {
                lastCalculed.old = newCalculed
                centerMain.innerHTML = ""
                this.#drawGrid()
            }
        })
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

            this.#drawGrid()
            this.autoResize && this.#activeResize()
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, AdaptativeGrid)