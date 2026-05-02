export const tag = "axis_tick-01"
export default class AxisTicks extends HTMLElement {
    /* private props */
    #STATE = null
    #HOR = null
    #DEPS = ["base", "dom", "timer"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
        value_width: "40px",
        value_height: "40px",
        transition: "1s ease-in-out"
    }
    #LOGIC = {
        orientation: ["horizontal", "vertical"]
    }
    #DATA = {
        values: 10,
        min: 0,
        max: 360,
        steps: 10
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

            --pointerBox_top: 
        }

        .mainBox {
            display: flex;
            
            .valuesCont {
                display: flex;

                .valueBox {
                    font-size: 12px;
                    color: grey;
                }
            }

            .pointsCont {
                display: flex; 
                justify-content: space-between;

                .point {
                    display: block;
                    background: grey;
                }

                .stepPoint {
                    width: 4px; 
                    height: 4px; 
                    border-radius: 50%; 
                }
            }

            .pointerCont .pointerBox {
                border: 1px solid grey;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0);
                backdrop-filter: blur(2px);
                font-size: 12px;
                color: grey;
                transition: var(--transition);
            }
        }

        .relative { position: relative; }
        .absolute { position: absolute; }
        .center { display: flex; align-items: center; justify-content: center; }
        .max { width: 100%; height: 100%; }
        .column { flex-direction: column; }

        .valuesCont_ver { flex-direction: column; width: 60%; height: 100%; }
        .pointsCont_ver { top: calc(100% / ${this.data.values + 1} / 2); flex-direction: column; width: 40%; height: calc(100% / ${this.data.values + 1} * ${this.data.values}); border-left: 1px solid grey; }
        .pointerCont_ver { width: 1px; height: 100%; } 

        .valuesCont_hor { width: 100%; height: 60%; }
        .pointsCont_hor { left: calc(100% / ${this.data.values + 1} / 2); width: calc(100% / ${this.data.values + 1} * ${this.data.values}); height: 40%; align-items: end;  border-bottom: 1px solid grey; }
        .pointerCont_hor { width: 100%; height: 1px; }

        .valueBox_ver { display: flex; align-items: center; justify-content: right; padding-right: 10px; }
        .valueBox_hor { display: flex; align-items: top; justify-content: center; padding-top: 10px; }

        .point_ver { width: 2px; height: 1px; }
        .point_hor { width: 1px; height: 2px; }

        .halfPoint_ver {width: 5px; height: 1px; }
        .halfPoint_hor {width: 1px; height: 5px; }

        .stepPoint_ver { left: -2px; }
        .stepPoint_hor { top: 2px; }

        .pointerBox_ver { top: calc(100% - 13px); left: 16px; width: 40px; height: 26px; }
        .pointerBox_hor { top: -42px; left: -20px; width: 40px; height: 26px; }
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

    #drawContainers() {
        this.#HOR = this.logic.orientation === "horizontal"
        this.#HOR && this.mainBox.classList.add("column")
        const pointsCont = this.deps.dom.add(this.mainBox, "ul", `pointsCont relative ${this.#HOR ? "pointsCont_hor" : "pointsCont_ver"}`)
        const valuesCont = this.deps.dom.add(this.mainBox, "ul", `valuesCont relative ${this.#HOR ? "valuesCont_hor" : "valuesCont_ver"}`)
        !this.#HOR && this.mainBox.prepend(valuesCont)
        const pointerCont = this.deps.dom.add(pointsCont, "div", `pointerCont absolute ${this.#HOR ? "pointerCont_hor" : "pointerCont_ver"}`)
        return { 'pointsCont': pointsCont, 'valuesCont': valuesCont, 'pointerCont': pointerCont }
    }

    #drawBoxes(container) {
        const range = (this.data.max - this.data.min) / this.data.values
        for (let x = 0; x <= this.data.values; x++) {
            const valueBox = this.deps.dom.add(container, "li", `valueBox max ${this.#HOR ? "valueBox_hor" : "valueBox_ver"}`)
            valueBox.textContent = this.#HOR
                ? this.data.min + range * x
                : this.data.min + (this.data.values * range) - (range * x)
        }
    }

    #drawPoints(container) {
        const steps = this.data.values * this.data.steps
        for (let x = 0; x <= steps; x++) {
            const point = this.deps.dom.add(container, "li", "point relative")
            if (x % this.data.steps === 0) {
                point.classList.add("stepPoint", `${this.#HOR ? "stepPoint_hor" : "stepPoint_ver"}`)
            } else if (x % (this.data.steps / 2) === 0) {
                point.classList.add(`${this.#HOR ? "halfPoint_hor" : "halfPoint_ver"}`)
            } else {
                point.classList.add(`${this.#HOR ? "point_hor" : "point_ver"}`)
            }
        }
    }

    #drawPointer(container) {
        const pointerBox = this.deps.dom.add(container, "div", `pointerBox center relative ${this.#HOR ? "pointerBox_hor" : "pointerBox_ver"}`)
        pointerBox.textContent = 0
    }

    /* public methods */
    getState() { return this.#STATE }

    updateCss(css) { this.deps.base.convertCssVar(css, this) }

    load() { this.#checkConf() }

    updateValue(value) {
        const pointerBox = this.dom.querySelector(".pointerBox")
        const pointerBox_lenght = this.#HOR ? pointerBox.offsetWidth : pointerBox.offsetHeight
        const container = this.dom.querySelector(".pointerCont")
        const range = this.data.max - this.data.min
        const lenght = this.#HOR ? container.offsetWidth : container.offsetHeight

        const pos = this.#HOR
            ? (value * lenght) / 100
            : lenght - (value * lenght) / 100

        this.#HOR
            ? pointerBox.style.left = `${pos - pointerBox_lenght / 2}px`
            : pointerBox.style.top = `${pos - pointerBox_lenght / 2}px`
        pointerBox.textContent = Math.round(range / 100 * value)
    }

    async init() {
        this.load()
        if (this.#STATE) {
            this.#configure()
            this.#addStyle()
            this.#drawComponent()
            const containers = this.#drawContainers()
            this.#drawBoxes(containers.valuesCont)
            this.#drawPoints(containers.pointsCont)
            this.#drawPointer(containers.pointerCont)
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, AxisTicks)