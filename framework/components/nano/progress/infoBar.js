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

        info_width: "40px",
        info_height: "100%",
        info_border: "none",
        info_radius: "none",
        info_back: "none",

        itemBar_width: "10px",
        itemBar_height: "100%",
        itemBar_border: "none",
        itemBar_radius: "none",
        itemBar_back: "none",
        itemBar_off: "none",
        itemBar_on: "red",
        itemBar_borderOff: "none",
        itemBar_borderOn: "none"
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
        this.data = { 'items': 20 }
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "ul", "mainBox max")
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
            position: relative;
            display: flex;
            align-items: center;
            background: var(--box_back);
            border: var(--box_border);
            border-radius: var(--box_radius);
            padding: var(--box_padding);

            * {transition: 300ms;}

            .infoBox {
                width: var(--info_width);
                height: var(--info_height);
                border: var(--info_border);
                border-radius: var(--info_radius);
                background: var(--info_back);
                backdrop-filter: blur(2px);
            }

            .itemBox {
                width: calc((100% - var(--info_width)) / 20);
                height: 100%;
                border: 1px solid grey;
            }

        }

        .relative {position: relative;}
        .absolute {position: absolute;}
        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .itemOff {border: var(--itemBar_borderOff); background: var(--itemBar_off);}
        .itemOn {border: var(--itemBar_borderOn); background: var(--itemBar_on);}
        `
    }

    #configure() {
        this.css = this.deps.base.resolveCSS(this.css, this.#CSS, this)
    }

    #drawBars() {
        const infoBox = this.deps.dom.add(this.mainBox, "li", "infoBox")
        for (let i = 0; i < this.data.items; i++) {
            const bar = this.deps.dom.add(this.mainBox, "li", "itemBox")
        }
    }

    async #moveto(index) {
        const infoBox = this.dom.querySelector(".infoBox")
        const itemBoxes = Array.from(this.dom.querySelectorAll(".itemBox"))
        const itemWidth = itemBoxes[0].offsetWidth

        
        for (let i = 0; i < index; i++) {
            const initialInfoLeft = window.getComputedStyle(infoBox).transform
            console.log(initialInfoLeft)

            const itemTranslate = `${itemWidth * (i + 1)}px`
            infoBox.style.transform = `translateX(${itemTranslate})`
/*             itemBoxes[i].style.transform = `translateX(${-initialInfoLeft})`
 */            await new Promise(resolve => setTimeout(resolve, 1500))
        }
    }

    #addFonts(fonts) {
        this.deps.fonts.addFonts(fonts)
    }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.state = ready
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
 */            this.#drawComponent()
            this.#drawBars()
            await new Promise(resolve => setTimeout(resolve, 2000))

            this.#moveto(1)
        }
    }
}
customElements.define(tag, InfoBar)