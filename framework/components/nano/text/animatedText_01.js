export const tag = "animated_text-01"
export default class AnimatedText extends HTMLElement {
    /* private props */
    #DEPS = ["base", "fonts", "dom"]
    #CSS = {
        charBox_back: "transparent",
        charBox_border: "initial",
        charBox_radius: "0px",
        charBox_margin: "0px",
        charBox_padding: "0px",
        char_top: "0px",
        char_empty: "0px",
        char_fontSize: "initial",
        char_fontFamily: "initial",
        char_fontColor: "initial",
        char_fontStyle: "initial",
        char_fontWeight: "initial"
    }
    #LOGIC = {
        orientation: ["horizontal", "vertical"]
    }

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
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
        this.state = false
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox autoAdjust")
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        :host {
            display: flex;
            width: 100%;
            height: 100%;
        }

        .mainBox {
            display: flex;

            .charBox {
                background: ${this.css.charBox_back};
                border: ${this.css.charBox_border};
                border-radius: ${this.css.charBox_radius};
                margin: ${this.css.charBox_margin};
                padding: ${this.css.charBox_padding};

                .char {
                    position: relative;
                    top: ${this.css.char_top};
                    font-family: ${this.css.char_fontFamily};
                    font-size: ${this.css.char_fontSize};
                    color: ${this.css.char_fontColor};
                    font-style: ${this.css.char_fontStyle};
                    font-weight: ${this.css.char_fontWeight};
                }
            }

            .emptyBox {
                width: ${this.css.char_empty};
                aspect-ratio: 1/1;
            }
        }

        .max {width: 100%; height: 100%;}
        .center {display: flex; justify-content: center; align-items: center;}
        .autoAdjust {width: fit-content; height: fit-content;}
        .vertical {flex-direction: column;}
        `
    }

    #configure() { this.deps.base.validateAll(this) }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.state = ready
    }

    #applyLogic() {
        this.logic.orientation === "vertical" && this.mainBox.classList.add("vertical")
    }

    #addText() {
        const dataText = Array.from(this.data.text)
        dataText.forEach(item => {
            const charBox = this.deps.dom.add(this.mainBox, "div", item === " " ? "emptyBox" : "charBox autoAdjust center")
            const char = this.deps.dom.add(charBox, "span", "char")
            char.textContent = item
        })
    }

    #addFonts() {
        this.deps.fonts.addFonts(this.fonts)
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
            this.#addFonts()
            this.#drawComponent()
            this.#applyLogic()
            this.#addText()
        }
    }
}
customElements.define(tag, AnimatedText)