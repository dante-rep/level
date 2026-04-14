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

        info_border: "none",
        info_radius: "none",
        info_back: "none",

        item_width: "80%",
        item_height: "100%",
        item_border: "none",
        item_radius: "none",
        item_back: "none",
        item_off: "none",
        item_on: "red",
        item_borderOff: "none",
        item_borderOn: "none"
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
        this.state = false
        this.data = {
            'items': 30,
            'infoLenght': 2
        }
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max relative")
        this.mainBox.innerHTML = `
        <ul class="refLayer absolute max"></ul>
        <ul class="visualLayer absolute max"></ul>
        <div class="infoLayer absolute max"><div class="infoBox absolute transition"></div></div>
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
                    border: 1px solid red;
                }
            }

            .refLayer {justify-content: space-between;}
        }

        .infoLayer .infoBox {
            top: var(--box_padding);
            left: var(--box_padding);
            width: calc(((100% - 2 * var(--box_padding)) / ${this.data.items}) * ${this.data.infoLenght});
            height: calc(100% - 2 * var(--box_padding));
            border: var(--info_border);
            border-radius: var(--info_radius);
            background: var(--info_back);
            backdrop-filter: blur(4px);
        }


        .relative {position: relative;}
        .absolute {position: absolute;}
        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .itemOff {border: var(--item_borderOff); background: var(--item_off);}
        .itemOn {border: var(--item_borderOn); background: var(--item_on);}
        .transition {transition: 300ms ease;}
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

    #getRefPosition() {
        const refBoxes = Array.from(this.dom.querySelectorAll(".refBox"))
        return refBoxes.map(item => item.offsetLeft)
    }

    #correctPosition(refs, visualBoxes) {
        const indexPos = refs.length - visualBoxes.length
        visualBoxes.forEach((box, index) => { box.style.left = `${refs[index + indexPos]}px` })
    }

    #addFonts(fonts) {
        this.deps.fonts.addFonts(fonts)
    }

    async moveto(index, refs, visual) {
        const infoBox = this.dom.querySelector(".infoBox")
        for (let i = 0; i < index; i++) {
            if (visual[i]) {
                /* move info */
                infoBox.style.left = `${refs[i + 1]}px`
                /* move itemBox */
                visual[i].style.left = `${refs[i]}px`
                await new Promise(resolve => setTimeout(resolve, 200))
            }
        }
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
/*             this.#addFonts(this.fonts)
 */            const boxes = this.#drawComponent()
            const refsBoxes = this.#drawBar(boxes.ref, "refBox", this.data.items)
            const refPos = this.#getRefPosition(refsBoxes)
            const visualBoxes = this.#drawBar(boxes.visual, "visualBox absolute itemOff transition", this.data.items - this.data.infoLenght)
            this.#correctPosition(refPos, visualBoxes)
            await new Promise(resolve => setTimeout(resolve, 2000))
            this.moveto(21, refPos, visualBoxes)
        }
    }
}
customElements.define(tag, InfoBar)