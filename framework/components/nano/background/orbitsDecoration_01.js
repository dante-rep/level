export const tag = "orbits-decoration-01"
export default class orbitsDecoration_01 extends HTMLElement {
    /* private props */
    #STATE = null
    #DEPS = ["base", "dom", "util"]
    #CSS = {
    }
    #LOGIC = {

    }
    #DATA = {
        orbitNum: 5,
        orbitSize_min: 50,
        orbitSize_max: 100,
        itemNum_min: 10,
        itemNum_max: 20,
        itemSize_min: 50,
        itemSize_max: 100,
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
        this.data = {}
        this._data = { ...this.#DATA }
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox relative max center")
        this.mainBox.innerHTML = `<div class="orbitsBox max center relative"></div>`
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }

        :host {
            width: 100%;
            height: 100%;
        }

        .mainBox {
            border: 3px solid blue;

            .orbitsBox {
                border: 1px solid red;

                .orbit {
                    aspect-ratio: 1/1;

                    .visualCircle {
                        aspect-ratio: 1/1;
                        border: 5px solid grey;
                        border-radius: 50%;
                        filter: blur(4px);
                        opacity: 0.5;
                    }
                }
            }
        }

        .max {width: 100%; height: 100%;}
        .relative {position: relative;}
        .absolute {position: absolute;}
        .center {display: flex; align-items: center; justify-content: center;}
        `
        return style
    }

    #configure() { this.deps.base.validateAll(this) }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.#STATE = ready
    }

    #draworbit() {
        for (let i = 0; i < this.data.orbitNum; i++) {
            const orbitsBox = this.mainBox.querySelector(".orbitsBox")
            const randomSize = this.deps.util.randomRange(this.data.orbitSize_min, this.data.orbitSize_max)
            const randomRotation = this.deps.util.randomRange(0, 360)

            const newOrb = this.deps.dom.add(orbitsBox, "div", "orbit absolute")
            newOrb.style.transform = `rotate(${randomRotation}deg)`
            newOrb.setAttribute("data-Rotation", randomRotation)
            newOrb.style.height = `${randomSize}%`
        }
        return Array.from(this.mainBox.querySelectorAll(".orbit"))
    }

    #drawVisualItems(orbit) {
        orbit.forEach(item => {
            const randomSize = this.deps.util.randomRange(this.data.itemSize_min, this.data.itemSize_max)
            const visual = this.deps.dom.add(item, "div", "visualCircle")
            visual.style.width = `${randomSize}px`
        })
    }

    #animate(orbits, style) {
        orbits.forEach((item, index) => {
            const initialRotation = Number(item.getAttribute("data-Rotation"))
            const randomTransition = this.deps.util.randomRange(100, 300)
            const direction = Number(this.deps.util.randomRange(0, 1) === 0 ? "360" : "-360")
            const animation = `
                @keyframes rotation_${index} {
                    from {transform: rotate(${initialRotation}deg);}
                    to {transform: rotate(${initialRotation + direction}deg);}
                }`
            style.textContent += animation
            item.style.animation = `${randomTransition}s rotation_${index} infinite linear`;
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
            const customStyle = this.#addStyle()
            this.#drawComponent()
            const orbits = this.#draworbit()
            this.#drawVisualItems(orbits)
            this.#animate(orbits, customStyle)
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, orbitsDecoration_01)