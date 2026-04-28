export const tag = "progress_bar-01"
export default class progressBar extends HTMLElement {
    /* private props */
    #BOX_MOVED = 0
    #DEPS = ["base", "fonts", "dom", "timer"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
        box_border: "none",
        box_radius: "none",
        box_back: "none",
        box_padding: "none",

        progress_height: "100%",
        progress_border: "none",
        progress_radius: "none",
        progress_back: "transparent",
        progress_fontFamily: "initial",
        progress_fontSize: "initial",
        progress_fontColor: "initial",
        progress_fontWeight: "initial",
        progress_letterSpacing: "0px",

        item_widthOff: "80%",
        item_heightOff: "100%",
        item_radiusOff: "none",
        item_backOff: "none",
        item_borderOff: "none",
        item_boxShadowOff: "none",

        item_widthOn: "30%",
        item_heightOn: "100%",
        item_radiusOn: "none",
        item_backOn: "none",
        item_borderOn: "none",
        item_boxShadowOn: "none",

        transition: "300ms ease-in-out"
    }
    #DATA = {
        items_multiplier: 2,
        progress_length: 2,
        progress_steps: 3,
    }

    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = { 'text': "some text" }
        this.fonts = [] /* [{}] */
        this.css = {}
        this._css = { ...this.#CSS }
        this.data = {}
        this._data = { ...this.#DATA }
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
        this.state = null
        this.value = 0
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max relative")
        this.mainBox.innerHTML = `
        <ul class="boxesLayer relative max"></ul>
        <div class="progressLayer absolute max">
            <div class="progressBox relative center max transition">
                <div class="progress center">
                    <span class="bracket">[ </span>
                    <span class="progressText center">0</span>
                    <span class="bracket"> ]</span>
                </div>
            </div>
        </div>
        `
        return {
            ref: this.dom.querySelector(".boxesLayer"),
            visual: this.dom.querySelector(".visualLayer"),
            progress: this.dom.querySelector(".progressLayer")
        }
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
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

            --blockWidth: calc(100% / ${this.data.items_multiplier * (10 + this.data.progress_length)});
        }

        .mainBox {
            background: var(--box_back);
            border: var(--box_border);
            border-radius: var(--box_radius);
            padding: var(--box_padding);

            .boxesLayer {
                display: flex;
                justify-content: flex-end;
                
                .box {
                    width: var(--blockWidth);
                    height: 100%;
                }

                .boxOff .item {
                    width: var(--item_widthOff);
                    height: var(--item_heightOff);
                    border-radius: var(--item_radiusOff);
                    border: var(--item_borderOff); 
                    background: var(--item_backOff);
                    box-shadow: var(--item_boxShadowOff);
                }

                .boxOn .item {
                    width: var(--item_widthOn);
                    height: var(--item_heightOn);
                    border-radius: var(--item_radiusOn);
                    border: var(--item_borderOn); 
                    background: var(--item_backOn);
                    box-shadow: var(--item_boxShadowOn);
                }
            }

            .progressLayer {
                top: 0px;

                .progressBox {
                    left: 0px;
                    width: calc(var(--blockWidth) * ${this.data.progress_length * this.data.items_multiplier}); 
                
                    .progress {
                        width: calc(100% - 10px);
                        height: var(--progress_height);
                        border: var(--progress_border);
                        border-radius: var(--progress_radius);
                        background: var(--progress_back);
                        backdrop-filter: blur(10px);
                        
                        * {
                            font-family: var(--progress_fontFamily);
                            font-size: var(--progress_fontSize);
                            font-weight: var(--progress_fontWeight);
                            color: var(--progress_fontColor);
                            letter-spacing: var(--progress_letterSpacing);
                        }

                        .progressText { width: 60%; }
                    }
                }
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
        this.state = ready
    }

    #drawBar() {
        for (let i = 0; i < this.data.items_multiplier * 10; i++) { const item = this.deps.dom.add(this.dom.querySelector(".boxesLayer"), "li", "box boxOff absolute center transition") }
        return Array.from(this.dom.querySelectorAll(".boxesLayer .box"))
    }

    #drawItems(boxes) {
        boxes.forEach(box => { this.deps.dom.add(box, "div", "item transition") })
    }

    #configurePos(boxes) {
        const progressBox = this.dom.querySelector(".progressBox")
        boxes.forEach((box, index) => {
            index === 0 && (box.style.left = `${progressBox.offsetLeft + progressBox.offsetWidth}px`)
            index >= 1 && (box.style.left = `${boxes[index - 1].offsetLeft + boxes[index - 1].offsetWidth}px`)
        })
    }

    #addFonts() {
        this.deps.fonts.addFonts(this.fonts)
    }

    async #moveTo(value, boxes, progressBox, boxesLayer, delay) {
        const boxWidth = boxes[0].offsetWidth
        const boxStep = 100 / boxes.length

        for (let i = this.value; i <= value; i++) {
            const currentBox = Math.floor(i / boxStep)

            if (currentBox !== this.#BOX_MOVED) {
                boxes[currentBox - 1].style.left = `${boxWidth * this.#BOX_MOVED}px`
                boxes[currentBox - 1].classList.replace("boxOff", "boxOn")
                progressBox.style.left = `${boxWidth * (this.#BOX_MOVED + 1)}px`
                this.#BOX_MOVED = currentBox
                await this.deps.timer.sleep(delay / 2)
            }
            this.#updateValue(i, delay)
            this.value = value
        }
    }

    async #updateValue(value, delay) {
        const progressText = this.dom.querySelector(".progressText")
        const steps = this.data.progress_steps

        for (let prog = 1; prog <= steps; prog++) {
            const progress = ((1 / steps) * prog + value - 1).toFixed(1)
            if (progress > 0) {
                progressText.textContent = progress === "100.0" ? "100" : progress
                await this.deps.timer.sleep((delay / 2) / steps)
            }
        }
    }

    async changeValue(value) {
        const boxesLayer = this.dom.querySelector(".boxesLayer")
        const boxes = boxesLayer.querySelectorAll(".box")
        const progressBox = this.dom.querySelector(".progressBox")
        const delay = this.deps.timer.getTransition(progressBox)

        if (value <= this.value || value < 0 || value > 100) {
            console.error(this, "value not valid 0 - 100")
            return
        } else {
            await this.#moveTo(value, boxes, progressBox, boxesLayer, delay)
        }
        return true
    }

    /* public methods */
    load() {
        this.#checkConf()
    }

    async init() {
        this.load()
        if (this.state) {
            this.#configure()
            this.#addStyle()
            this.#addFonts(this.fonts)

            const layers = this.#drawComponent()
            await new Promise(requestAnimationFrame)
            await new Promise(requestAnimationFrame)

            const boxes = this.#drawBar(layers.ref, "refBox", this.data.items_multiplier * 10)
            this.#configurePos(boxes)
            this.#drawItems(boxes)
        }
    }
}
customElements.define(tag, progressBar)