export const tag = "cube-3d"
export default class cube3D extends HTMLElement {
    /* private props */
    #STATE = null
    #DEPS = ["base", "dom"]
    #CSS = {
        box_size: "100px",
        box_perspective: "400px",
        box_border: "none",
        box_radius: "0px",
        box_back: "grey",
        box_shadow: "none",
        transition: "1s ease-in-out"
    }

    constructor() {
        super()
        /* public props */
        this.dom = this.attachShadow({ mode: "open" })
        this.data = { 'text': "some text" }
        this.fonts = null /* [{}] */
        this.css = {}
        this._css = { ...this.#CSS }
        this.deps = {}
        this.requiredDeps = [...this.#DEPS]
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
        box-sizing: border-box;
        list-style: none;
    }

    :host {
        display: flex;
        width: var(--box_size);
        aspect-ratio: 1/1;

        --pos_start: calc(var(--box_size) * -0.5);
        --pos_end: calc(var(--box_size) * 0.5);
        --rotateY: 0deg;
        --rotateX: 0deg;
    }

    .mainBox {
        width: 100%;
        height: 100%;
        perspective: var(--box_perspective);

        .cube {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transform-origin: 50% 50% var(--pos_start);
            transform: rotateY(var(--rotateY)) rotateX(var(--rotateX));
            transition: var(--transition);

            li {
                border: var(--box_border);
                border-radius: var(--box_radius);
                box-shadow: var(--box_shadow);
                background: var(--box_back);
                font-size: 20px; 
                color: rgb(255, 255, 255);
                filter: blur(0.1px);
            }

            .front  { transform: rotateY(0deg)   translateZ(0px); }
            .back   { transform: rotateY(180deg) translateZ(var(--box_size)); }
            .right  { transform: rotateY(90deg)  translateZ(var(--pos_start)) translateX(var(--pos_end)); }
            .left   { transform: rotateY(-90deg) translateZ(var(--pos_start)) translateX(var(--pos_start)); }
            .top    { transform: rotateX(90deg)  translateZ(var(--pos_start)) translateY(var(--pos_start)); }
            .bottom { transform: rotateX(-90deg) translateZ(var(--pos_start)) translateY(var(--pos_end)); }
        }
    }

    .max { width: 100%; height: 100%; }
    .center { display: flex; align-items: center; justify-content: center; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    `
    }

    #configure() { this.deps.base.validateAll(this) }

    #checkConf() {
        let ready = true
        this.#DEPS.forEach(dep => !Object.keys(this.deps).includes(dep) && (ready = false))
        this.#STATE = ready
    }

    #addEvents() {
        window.addEventListener("mousemove", (e) => {
            this.dom.host.style.setProperty("--rotateY", Math.round((e.clientX / window.innerWidth) * 360) + "deg")
            this.dom.host.style.setProperty("--rotateX", Math.round((e.clientY / window.innerHeight) * 360) + "deg")
        })
    }

    /* public methods */
    getState() { return this.#STATE }

    updateCss(css) {
        this.deps.base.convertCssVar(css, this)
    }

    rotate(axis, value) {
        axis === "x"
            ? this.dom.host.style.setProperty("--rotateY", value + "deg")
            : this.dom.host.style.setProperty("--rotateX", value + "deg")
    }

    load() {
        this.#checkConf()
    }

    async init() {
        this.load()
        console.log(this.deps)
        if (this.#STATE) {
            this.#configure()
            this.#addStyle()
            this.#drawComponent()
        } else {
            console.error(this, "dependencies lost")
        }
    }
}
customElements.define(tag, cube3D)