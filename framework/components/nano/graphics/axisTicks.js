export const tag = "axis_tick-01"
export default class AxisTicks extends HTMLElement {
    /* private props */
    #STATE = null
    #HOR = null
    #DEPS = ["base", "dom", "timer", "fonts"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",

        steps_fontFamily: "initial",
        steps_fontSize: "12px",
        steps_fontWeight: "initial",
        steps_fontStyle: "normal",
        steps_fontColor: "grey",

        simplePoint_width: "1px",
        simplePoint_height: "3px",
        simplePoint_border: "none",
        simplePoint_radius: "none",
        simplePoint_back: "grey",

        halfPoint_width: "1px",
        halfPoint_height: "5px",
        halfPoint_border: "none",
        halfPoint_radius: "none",
        halfPoint_back: "grey",

        stepPoint_width: "4px",
        stepPoint_height: "4px",
        stepPoint_border: "none",
        stepPoint_radius: "50%",
        stepPoint_back: "grey",

        valueBox_width: "40px",
        valueBox_height: "22px",
        valueBox_border: "none",
        valueBox_radius: "4px",
        valueBox_back: "grey",
        valueBox_fontFamily: "initial",
        valueBox_fontSize: "12px",
        valueBox_fontWeight: "initial",
        valueBox_fontStyle: "normal",
        valueBox_fontColor: "white",

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
        this.fonts = [] /* [{}] */
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
        }

        .mainBox {
            display: flex;
            
            .stepsCont {
                display: flex;

                .stepBox {
                    font-family: var(--steps_fontFamily);
                    font-size: var(--steps_fontSize);
                    font-style: var(--steps_fontStyle);
                    font-weight: var(--steps_fontWeight); 
                    color: var(--steps_fontColor);
                }
            }

            .pointsCont {
                display: flex; 
                justify-content: space-between;
                
                .simplePoint {
                    width: var(--simplePoint_width);
                    height: var(--simplePoint_height);
                    border: var(--simplePoint_border);
                    border-radius: var(--simplePoint_radius);
                    background: var(--simplePoint_back);
                }

                .halfPoint {
                    width: var(--halfPoint_width);
                    height: var(--halfPoint_height);
                    border: var(--halfPoint_border);
                    border-radius: var(--halfPoint_radius);
                    background: var(--halfPoint_back);
                }

                .stepPoint {
                    width: var(--stepPoint_width); 
                    height: var(--stepPoint_height); 
                    border: var(--stepPoint_border);
                    border-radius: var(--stepPoint_radius); 
                    background: var(--stepPoint_back);
                }
            }

            .pointsCont_ver { 
                top: calc((100% / ${this.data.values + 1}) / 2 - var(--stepPoint_height) / 2); 
                flex-direction: column; 
                width: 40%; 
                height: calc(100% / ${this.data.values + 1} * ${this.data.values} + var(--stepPoint_height)); 

                .stepPoint_ver { left: calc(var(--stepPoint_width) / 2 * -1); }
            }   

            .pointsCont_hor { 
                left: calc(100% / ${this.data.values + 1} / 2 - var(--stepPoint_width));
                align-items: end;  
                width: calc(100% / ${this.data.values + 1} * ${this.data.values} + var(--stepPoint_height) * 2); 
                height: 40%; 

               .stepPoint_hor { top: calc(var(--stepPoint_height) / 2); }
            }

            .valueCont .valueBox {
                width: var(--valueBox_width);
                height: var(--valueBox_height);
                border: var(--valueBox_border);
                border-radius: var(--valueBox_radius); 
                background: var(--valueBox_back);
                font-family: var(--valueBox_fontFamily);
                font-size: var(--valueBox_fontSize);
                font-style: var(--valueBox_fontStyle);
                font-weight: var(--valueBox_fontWeight); 
                color: var(--valueBox_fontColor);
                transition: var(--transition);
            }
        }

        .relative { position: relative; }
        .absolute { position: absolute; }
        .center { display: flex; align-items: center; justify-content: center; }
        .max { width: 100%; height: 100%; }
        .column { flex-direction: column; }

        .stepsCont_ver { flex-direction: column; width: 60%; height: 100%; border-right: 1px solid grey; }
        .stepsCont_hor { width: 100%; height: 60%; border-top: 1px solid grey; }

        .stepPoint_ver { left: calc(var(--stepPoint_width) / 2); }

        .valueCont_ver { width: 1px; height: 100%; } 
        .valueCont_hor { width: 100%; height: 1px; }

        .stepBox_ver { padding-right: 10px; }

        .valueBox_ver { top: calc(100% - 13px); left: 16px; }
        .valueBox_hor { top: -34px; left: -20px; }
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
        const stepsCont = this.deps.dom.add(this.mainBox, "ul", `stepsCont relative ${this.#HOR ? "stepsCont_hor" : "stepsCont_ver"}`)
        !this.#HOR && this.mainBox.prepend(stepsCont)
        const valueCont = this.deps.dom.add(pointsCont, "div", `valueCont absolute ${this.#HOR ? "valueCont_hor" : "valueCont_ver"}`)
        return { 'pointsCont': pointsCont, 'stepsCont': stepsCont, 'valueCont': valueCont }
    }

    #drawBoxes(container) {
        const range = (this.data.max - this.data.min) / this.data.values
        for (let x = 0; x <= this.data.values; x++) {
            const stepBox = this.deps.dom.add(container, "li", `stepBox max center ${this.#HOR ? "stepBox_hor" : "stepBox_ver"}`)
            stepBox.textContent = this.#HOR
                ? this.data.min + range * x
                : this.data.min + (this.data.values * range) - (range * x)
        }
    }

    #drawPoints(container) {
        const steps = this.data.values * this.data.steps
        for (let x = 0; x <= steps; x++) {
            const point = this.deps.dom.add(container, "li", "relative")
            if (x % this.data.steps === 0) {
                point.className = `stepPoint relative ${this.#HOR ? "stepPoint_hor" : "stepPoint_ver"}`
            } else if (x % (this.data.steps / 2) === 0) {
                point.classList.add("halfPoint")
            } else {
                point.classList.add("simplePoint")
            }
        }
    }

    #drawPointer(container) {
        const valueBox = this.deps.dom.add(container, "div", `valueBox center relative ${this.#HOR ? "valueBox_hor" : "valueBox_ver"}`)
        valueBox.textContent = 0
    }

    #addFonts() {
        this.deps.fonts.addFonts(this.fonts)
    }

    /* public methods */
    getState() { return this.#STATE }

    updateCss(css) { this.deps.base.convertCssVar(css, this) }

    load() { this.#checkConf() }

    updateValue(value) {
        if (value >= 0 && value <= 100) {
            const valueBox = this.dom.querySelector(".valueBox")
            const valueBox_length = this.#HOR ? valueBox.offsetWidth : valueBox.offsetHeight
            const container = this.dom.querySelector(".valueCont")
            const range = this.data.max - this.data.min
            const length = this.#HOR ? container.offsetWidth : container.offsetHeight

            const pos = this.#HOR
                ? (value * length) / 100
                : length - (value * length) / 100

            this.#HOR
                ? valueBox.style.left = `${pos - valueBox_length / 2}px`
                : valueBox.style.top = `${pos - valueBox_length / 2}px`
            valueBox.textContent = Math.round(this.data.min + (range / 100 * value))
        } else {
            console.error(this, "value out of range: 0-100")
        }
    }

    async init() {
        this.load()
        if (this.#STATE) {
            this.#addFonts()
            this.#configure()
            this.#addStyle()
            this.#drawComponent()
            const containers = this.#drawContainers()
            this.#drawBoxes(containers.stepsCont)
            this.#drawPoints(containers.pointsCont)
            this.#drawPointer(containers.valueCont)
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, AxisTicks)