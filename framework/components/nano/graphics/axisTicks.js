export const tag = "axis_tick-01"
export default class AxisTicks extends HTMLElement {
    /* private props */
    #STATE = null
    #HOR = null
    #DEPS = ["base", "dom"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
        value_width: "40px",
        value_height: "40px"
    }
    #LOGIC = {
        orientation: ["horizontal", "vertical"]
    }
    #DATA = {
        values: 10,
        min: 0,
        max: 100
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
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max relative")
        this.mainBox.innerHTML = `
        <ul class="valuesCont absolute max"></ul>
        <ul class="pointsCont absolute max"></ul>
        `
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            list-style: none;
        }

        :host {
            display: flex;
            width: var(--box_width);
            height: var(--box_height);
        }

        .mainBox {

            .valuesCont {
                font-size: 12px;
                color: grey;
                border: 1px solid grey;

                .valueBox {
                    border: 1px solid red;
                }
            }


            .pointsBox {
                background: grey;
            }
        }

        .relative {position: relative;}
        .absolute {position: absolute;}
        .max {width: 100%; height: 100%;}
        .vertical {display: flex; flex-direction: column;}
        .verValue {display: flex; align-items: end;}
        .horValue {display: flex; align-items: end;}
        .horizontal {display: flex;}
        `
    }

    #configure() {
        this.deps.base.validateAll(this)
        this.deps.base.convertCssVar({ "step": this.data.values }, this)
    }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.#STATE = ready
    }

    #drawBoxes() {
        this.#HOR = this.logic.orientation === "horizontal"
        const valuesCont = this.dom.querySelector(".valuesCont")
        this.mainBox.classList.add(this.#HOR ? "vertical" : "horizontal")

        const boxes = [valuesCont]
        boxes.forEach(box => box.classList.add(this.#HOR ? "horizontal" : "vertical"))


        const stepValue = (this.data.max - this.data.min) / this.data.values
        for (let x = 0; x <= this.data.values; x++) {
            const valuesBox = this.deps.dom.add(valuesCont, "li", `valueBox max ${this.#HOR ? "horValue" : "verValue"}`)
            valuesBox.textContent = this.#HOR ? x * stepValue : (this.data.max - this.data.min) - x * stepValue
        }
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
            this.#drawBoxes()
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, AxisTicks)