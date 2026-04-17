export const tag = "nano-info-bar"
export default class InfoBar extends HTMLElement {
    /* private props */
    #DEPS = ["base", "fonts", "dom"]
    #CSS = {
        box_width: "100%",
        box_height: "100%",
        box_border: "none",
        box_radius: "none",
        box_back: "none",
        box_padding: "none",

        info_height: "100%",
        info_border: "none",
        info_radius: "none",
        info_back: "none",
        info_fontFamily: "initial",

        item_width: "80%",
        item_height: "100%",
        item_radius: "none",
        item_backOff: "none",
        item_backOn: "red",
        item_borderOff: "none",
        item_borderOn: "none",

        transition: "200ms ease-in-out"
    }

    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = { 'text': "some text" }
        this.fonts = null /* [{}] */
        this.css = {}
        this.logic = {}
        this.deps = {}
        this.data = {
            'items': 30,
            'infoLenght': 2,
        }
        this.state = null
        this.value = 0
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max relative")
        this.mainBox.innerHTML = `
        <ul class="refLayer absolute max"></ul>
        <ul class="visualLayer absolute max"></ul>
        <div class="infoLayer absolute max">
            <div class="infoBox absolute center transition">
                <span class="infoText center">[ 0 ]</span>
            </div>
        </div>
        `
        return {
            ref: this.dom.querySelector(".refLayer"),
            visual: this.dom.querySelector(".visualLayer"),
            info: this.dom.querySelector(".infoLayer")
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
        }

        :host {
            display: flex;
            width: var(--box_width);
            height: var(--box_height);
        }

        .mainBox {
            background: var(--box_back);
            border: var(--box_border);
            border-radius: var(--box_radius);

            .refLayer,
            .visualLayer {
                display: flex;
                padding: var(--box_padding);

                .refBox, 
                .visualBox {width: calc((100% - 2 * var(--box_padding)) / ${this.data.items});}

                .visualBox {
                    border-radius: var(--item_radius);
                    height: calc(100% - 2 * var(--box_padding));
                    background: var(--item_back);
                }
            }

            .refLayer {justify-content: space-between;}

            .itemBar {
                width: var(--item_width);
                height: var(--item_height);
                border-radius: var(--item_radius);
            }
        }

        .infoLayer {
            display: flex;
            align-items: center;

            .infoBox {
                left: 0px;
                width: calc(((100% - 2 * var(--box_padding)) / ${this.data.items}) * ${this.data.infoLenght});
                height: var(--info_height);
                border: var(--info_border);
                border-radius: var(--info_radius);
                background: var(--info_back);
                backdrop-filter: blur(4px);

                .infoText {
                    font-family: var(--info_fontFamily);
                    font-size: 18px;
/*                  font-weight: bolder;
*/               
                    color: grey;
                    letter-spacing: 2px;
                }
            }
        }
    
        .relative {position: relative;}
        .absolute {position: absolute;}
        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .itemOff {border: var(--item_borderOff); background: var(--item_backOff);}
        .itemOn {border: var(--item_borderOn); background: var(--item_backOn);}
        .transition {transition: var(--transition);}
        `
    }

    #configure() {
        this.css = this.deps.base.resolveCSS(this.css, this.#CSS, this)
    }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.state = ready
    }

    #drawBar(box, className, number) {
        for (let i = 0; i < number; i++) { const item = this.deps.dom.add(box, "li", className) }
        return Array.from(box.querySelectorAll("li"))
    }

    #drawItems(boxes) {
        boxes.forEach(box => { this.deps.dom.add(box, "div", "itemBar itemOff transition") })
    }

    #getRefPosition() {
        const refBoxes = Array.from(this.dom.querySelectorAll(".refBox"))
        return refBoxes.map(item => item.offsetLeft)
    }

    #correctPosition(refs, visualBoxes) {
        const indexPos = refs.length - visualBoxes.length
        visualBoxes.forEach((box, index) => { box.style.left = `${refs[index + indexPos]}px` })
    }

    #addFonts() {
        this.deps.fonts.addFonts(this.fonts)
    }

    async #moveTo(value, infoBox, refPos, delay, visual) {
        const visualBarWidth = this.mainBox.offsetWidth - infoBox.offsetWidth
        const distance = visualBarWidth * (value / 100)

        for (let i = 0; i < refPos.length; i++) {
            if (refPos[i] >= distance) return

            if (visual[i] && visual[i].querySelector(".itemBar").classList.contains("itemOff")) {
                /* move info */
                infoBox.style.left = `${refPos[i + 1]}px`;
                /* move item */
                visual[i].style.left = `${refPos[i]}px`;
                visual[i].querySelector(".itemBar").classList.replace("itemOff", "itemOn");
            }
            await this.deps.timers.sleep(delay)
        }
    }

    async #updateValue(value, infoBox, refPos, visuals, delay) {
        const percentageBox = this.dom.querySelector(".percentage")
        const infoText = infoBox.querySelector(".infoText")
        const roundSteps = 5
        const blocks = visuals.length
        const totalSteps = roundSteps * blocks
        const actualSteps = Math.floor((value * totalSteps) / 100)
        const stepValue = 100 / totalSteps

        console.log("total:", totalSteps, "blocks", blocks, "step", stepValue, "actualSteps", actualSteps)

        console.log(this.value)
        for (let x = 1; x <= actualSteps; x++) { /* falta el .5 */
            console.log(this.value + stepValue * x)
            const newValue = x === actualSteps && this.value + value === 100
            ? 100
            : this.value + stepValue * x
            infoText.textContent = `[ ${newValue.toFixed(1)} ]`
            await new Promise(r => setTimeout(r, delay / actualSteps))
        }
    }

    async changeValue(value) {
        const visuals = Array.from(this.dom.querySelectorAll(".visualBox"))
        const infoBox = this.dom.querySelector(".infoBox")
        const refPos = this.#getRefPosition()
        const delay = this.deps.timers.getTransition(infoBox) / 3 /* transition css */

        if (this.value + value < 0 || this.value + value > 100) {
            console.error(this, "value not valid 0 - 100")
            return
        }

        await Promise.all([
            this.#updateValue(value, infoBox, refPos, visuals, delay)

/*             this.#moveTo(value, infoBox, refPos, delay, visual),
 */        ])
        this.value = this.value + value
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
            await new Promise(requestAnimationFrame)
            await new Promise(requestAnimationFrame)

            const boxes = this.#drawComponent()

            const refsBoxes = this.#drawBar(boxes.ref, "refBox", this.data.items)
            await new Promise(requestAnimationFrame)
            await new Promise(requestAnimationFrame)

            const refPos = this.#getRefPosition(refsBoxes)
            const visualBoxes = this.#drawBar(boxes.visual, "visualBox absolute center transition", this.data.items - this.data.infoLenght)
/*             await new Promise(requestAnimationFrame)
 */            this.#correctPosition(refPos, visualBoxes)
            this.#drawItems(visualBoxes)

            await this.deps.timers.sleep(3000)
            this.changeValue(50)
            await this.deps.timers.sleep(3000)
            this.changeValue(50)
        }
    }
}
customElements.define(tag, InfoBar)