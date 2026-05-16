export const tag = "progress_bar-01"
export default class progressBar extends HTMLElement {
    /* private props */
    #DEPS = ["base", "fonts", "dom", "timer"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
        box_border: "none",
        box_radius: "none",
        box_back: "none",
        box_padding: "4px",

        progress_width: "80px",
        progress_height: "100%",
        progress_border: "none",
        progress_radius: "none",
        progress_back: "transparent",
        progress_fontFamily: "initial",
        progress_fontSize: "initial",
        progress_fontColor: "initial",
        progress_fontWeight: "initial",
        progress_letterSpacing: "0px",

        item_width: "80%",
        item_height: "100%",
        item_radius: "none",
        item_border: "none",
        item_backOff: "none",
        item_backOn: "none",

        transition: "300ms ease-in-out"
    }
    #LOGIC = {
        side: ["left", "right"]
    }
    #DATA = {
        max: 100,
        items: 10,
        steps: 3,
        delay: 10
    }
    #BAR = {}
    #STATE = null

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
        this.value = 0
        this.progressTask = { 'queue': Promise.resolve() }
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max")
        this.mainBox.innerHTML = `
        <div class="progressBox center">
            <span class="symbol">[</span>
            <span class="progressCounter center">${this.value}</span>
            <span class="symbol">]</span>            
        </div>
        <ul class="barBox"></ul>
        `
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style", "customStyle")
        style.textContent += `
        * {
            padding: 0px;
            margin: 0px;
            box-sizing: border-box;
            list-style: none;
            user-select: none;
        }

        :host {
            display: flex;
            width: var(--box_width);
            height: var(--box_height);
        }

        .mainBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--box_back);
            border: var(--box_border);
            border-radius: var(--box_radius);
            padding: var(--box_padding);

            .barBox {
                display: flex;
                width: calc(100% - (var(--progress_width) + 6px));
                height: 100%;

                .box {
                    width: 100%;
                    height: 100%;

                    .item {
                        width: var(--item_width);
                        height: var(--item_height);
                        border-radius: var(--item_radius);
                        border: var(--item_border); 
                    }
                }

                .box_off .item {background: var(--item_backOff);}
                .box_on .item {background: var(--item_backOn);}
            }

            .progressBox {
                width: calc(var(--progress_width));
                height: var(--progress_height);
                border: var(--progress_border);
                border-radius: var(--progress_radius);
                background: var(--progress_back);
                
                * {
                    font-family: var(--progress_fontFamily);
                    font-size: var(--progress_fontSize);
                    font-weight: var(--progress_fontWeight);
                    color: var(--progress_fontColor);
                    letter-spacing: var(--progress_letterSpacing);
                }

                .progressCounter { width: 60%; }
            }
        }

    
        .relative {position: relative;}
        .absolute {position: absolute;}
        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .transition {transition: var(--transition);}
        `
    }

    #configure() {
        this.deps.base.validateAll(this)
    }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.#STATE = ready
    }

    #drawBar() {
        const barBox = this.mainBox.querySelector(".barBox")
        const progressBox = this.mainBox.querySelector(".progressBox")
        const containerWidth = this.mainBox.querySelector(".barBox").offsetWidth

        for (let i = 0; i < this.data.items; i++) {
            const itemBox = this.deps.dom.add(barBox, "li", "box box_off center relative transition")
            const visibleItem = this.deps.dom.add(itemBox, "div", "item transition")
        }
        this.logic.side === "right" && this.mainBox.appendChild(progressBox)

        return {
            progress: this.mainBox.querySelectorAll("span")[1],
            boxes: Array.from(this.mainBox.querySelectorAll(".barBox .box"))
        }
    }

    #addFonts() { this.deps.fonts.addFonts(this.fonts) }

    async #updateBar(value, delay) {
        const steps = this.data.steps
        const boxes = this.#BAR.boxes
        const boxSteps = this.data.max / boxes.length * steps
        const stepValue = 1 / this.data.steps
        const initialStep = this.value * steps
        const finalStep = value * steps
        console.log("initial", initialStep, "final", finalStep, "boxSteps", boxSteps)

        for (let i = initialStep; i <= finalStep; i++) {
            const progress = (i * stepValue)
            this.#BAR.progress.textContent = progress.toFixed(1)

             if (i / boxSteps >= 1) {
                const box = boxes[Math.floor(i / boxSteps) - 1]
                console.log(box)
                box.classList.contains("box_off") && box.classList.replace("box_off", "box_on")
             }
            await this.deps.timer.sleep(delay)
        }
    }

    async #updateProgress(value, delay) {

    }

    async changeValue(value) {
        this.progressTask.queue = this.progressTask.queue.then(async () => {

            if (value < 0 || value > 100) {
                console.error(this, "value not valid 0 - 100")
                return
            } else {
                await this.#updateBar(value, this.data.delay)
                this.value = value
            }
            return true
        })
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
            this.#addFonts(this.fonts)

            this.#drawComponent()
            this.#BAR = this.#drawBar()
        }
    }
}
customElements.define(tag, progressBar)