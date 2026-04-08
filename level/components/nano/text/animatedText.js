export const tag = "nano-animated-text"
export default class AnimatedText extends HTMLElement {
    /* private props */
    #CSS = {
        font_size: "initial",
        font_family: "initial",
        font_color: "initial",
        font_style: "initial",

        char_margin: "0px",
        char_padding: "0px",
        char_empty: "0px"
    }

    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = { 'text': "some text" }
        this.fonts = null /* [{}] */
        this.css = {}
        this.deps = {}
    }

    /* private nethods */
    #drawComponent() {
        this.dom.innerHTML += `
        <div class="mainBox autoAdjust"></div>
        `
    }

    #addStyle() {
        const style = document.createElement("style")
        this.dom.appendChild(style)
        style.textContent += `
        :host {
            display: flex;
            width: 100%;
            height: 100%;
            border: 1px solid green;    
        }

        .mainBox {
            display: flex;
            border: 1px solid blue;

            .charBox {
                font-family: "${this.css.font_family}";
                font-size: ${this.css.font_size};
                color: ${this.css.font_color};
                font-style: ${this.css.font_style};
                padding: ${this.css.char_padding};
                margin: ${this.css.char_margin};
                border: 1px solid grey;
            }

            .emptyBox {
                width: ${this.css.char_empty};
            }
        }

        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .autoAdjust {width: fit-content; height: fit-content;}
        `
    }

    #configure() {
        this.css = this.deps.base.resolveCSS(this.css, this.#CSS, this)
    }

    async #testReady() {
        console.log(this.deps)
        return true
    }

    #addText() {
        const dataText = Array.from(this.data.text)
        const mainBox = this.dom.querySelector(".mainBox")
        dataText.forEach(char => {
            const charBox = document.createElement("span")
            charBox.className = char === " " ? "emptyBox" : "charBox autoAdjust center"
            mainBox.appendChild(charBox)
            charBox.textContent = char
        })
    }

    #addFonts() {
        if (!document.head.querySelector(".dynamicStyle_fonts")) {
            const dynamicStyle_fonts = document.head.appendChild(document.createElement("style"))
            dynamicStyle_fonts.className = "dynamicStyle_fonts"
        }
        const fontStyle = document.head.querySelector(".dynamicStyle_fonts")
        this.fonts.forEach(font => {
            const previousNAME = fontStyle.textContent.includes(font.name)
            const previousSRC = fontStyle.textContent.includes(font.src)
            const ext = font.src.split(".").pop()
            const format = ext === "otf" ? "opentype" : ext
            if (!previousNAME && !previousSRC) fontStyle.textContent += `
                @font-face {
                    font-family: "${font.name}";
                    src: url("${font.src}") format(${format});
                }
            `
        })
    }

    /* public methods */
    async load() {
        await this.#testReady()
        this.#configure()
        this.#addStyle()
        this.#addFonts()
    }

    async init() {
        await this.load()
        this.#drawComponent()
        this.#addText()
    }
}
customElements.define(tag, AnimatedText)