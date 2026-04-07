export const tag = "nano-animated-text"
export default class AnimatedText extends HTMLElement {
    /* private props */
    #CSS = {
        font_size: "44px",
        font_family: "initial",
        font_color: "initial",
        font_style: "initial",

        char_margin: "10px",
        char_spacing: "10px"
    }
    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = {'text': "some text"}
    }

    /* private nethods */
    #drawComponent() {
        const mainBox = document.createElement("div")
        mainBox.className = "mainBox autoAdjust"
        this.dom.appendChild(mainBox)

        const style = document.createElement("style")
        this.dom.appendChild(style)
        style.textContent = `
        :host {
            display: flex;
            width: fit-content;
            height: fit-content;
            border: 1px solid green;    
        }

        .mainBox {
            border: 1px solid blue;

            .charBox {
                font-family: ${this.#CSS.font_family};
                font-size: ${this.#CSS.font_size};
                font_color: ${this.#CSS.font_color};
                font_style: ${this.#CSS.font_style};

                
                border: 1px solid grey;
            }
        }

        .autoAdjust {width: fit-content; height: fit-content;}
        `
    }

    #addText() {
        const dataText = Array.from(this.data.text)
        const mainBox = this.dom.querySelector(".mainBox")
        dataText.forEach(char => {
            const charBox = document.createElement("span")
            charBox.classList.add("charBox")
            mainBox.appendChild(charBox)
            charBox.textContent = char
        })
    }

    /* public methods */
    async load() {
        this.#drawComponent()
        this.#addText()
    }

    async init() {
        await this.load()
    }
}
customElements.define(tag, AnimatedText)