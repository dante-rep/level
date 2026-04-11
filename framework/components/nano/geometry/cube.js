export const tag = "nano-cube-3d"
export default class cube3D extends HTMLElement {
    /* private props */
    #DEPS = ["base", "dom"]
    #CSS = {
        box_size: "100px",
        box_perspective: "400px",
        box_border: "none",
        box_radius: "0px",
        box_back: "grey",
        box_shadow: "none"
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
    }

    /* private nethods */
    #drawComponent() {
        this.mainBox = this.deps.dom.add(this.dom, "div", "mainBox max")
        this.mainBox.innerHTML = `
        <ul class="cube relative max">
            <li class="max center absolute top">top</li>
            <li class="max center absolute right">right</li>
            <li class="max center absolute bottom">bottom</li>
            <li class="max center absolute left">left</li>
            <li class="max center absolute front">front</li>
            <li class="max center absolute back">back</li>
        </ul>
        `
    }

    #addStyle() {
        const style = this.deps.dom.add(this.dom, "style")
        style.textContent += `
        * {
            margin: 0px;
            padding: 0px;
        }

        :host {
            display: flex;
            width: ${this.css.box_size};
            aspect-ratio: 1/1;

            --pos_start: calc(${this.css.box_size} * -0.5);
            --pos_end: calc(${this.css.box_size} * 0.5);
            --rotateY: 0deg;
            --rotateX: 0deg;
        }

        .mainBox {
            perspective: ${this.css.box_perspective};

            .cube {
                transform-style: preserve-3d;
                transform-origin: 50% 50% var(--pos_start);
                transform: rotateY(var(--rotateY)) rotateX(var(--rotateX));

                li {
                    border: ${this.css.box_border};
                    border-radius: ${this.css.box_radius};
                    box-shadow: ${this.css.box_shadow};
                    background: ${this.css.box_back};
                    font-size: 100px;
                    color: rgb(255, 255, 255);
                    filter: blur(0.2px);
                }

                .left {transform: translateZ(var(--pos_start)) translateX(var(--pos_start)) rotateY(-90deg);}
                .right {transform: translateZ(var(--pos_start)) translateX(var(--pos_end)) rotateY(90deg);}
                .top {transform: translateY(var(--pos_start)) translateZ(var(--pos_start)) rotateX(90deg) ;}
                .bottom {transform: translateY(var(--pos_end)) translateZ(var(--pos_start)) rotateY(180deg) rotateX(-90deg);}
                .back {transform: translateZ(-${this.css.box_size}) rotateY(180deg);}
            }

            .inputsBox {
                margin-top: 50px;
                width: 300px;
                height: 100px;
                border: 1px solid red;

                input {
                    width: 100%;
                    height: 50%;
                }
            }
        }

        .max {width: 100%; height: 100%;}
        .center {display: flex; align-items: center; justify-content: center;}
        .absolute {position: absolute;}
        .relative {position: relative;}
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

    #addEvents() {
        window.addEventListener("mousemove", (e) => {
            this.dom.host.style.setProperty("--rotateY", Math.round((e.clientX / window.innerWidth) * 360) + "deg")
            this.dom.host.style.setProperty("--rotateX", Math.round((e.clientY / window.innerHeight) * 360) + "deg")
        })
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
            this.#drawComponent()
            this.#addEvents()
        }
    }
}
customElements.define(tag, cube3D)