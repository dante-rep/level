const drawLanding = async (help) => {
    document.body.innerHTML += `
        <div class="darkBar topDarkBar absolute transition1s"></div>
        <div class="landingContainer invisible max transition08s">
            <section class="titlesSection column">
                <div class="titlesContainer columnCenter">
                    <div class="titlesBox column"></div>
                    <div class="barBox invisible transition05s"></div>
                </div> 
                <input id="access" type="button" class="button hidden" value="Access">
            </section>
            <section class="animationSection center"></section>
        </div>
        <div class="darkBar bottomDarkBar absolute transition1s"></div>
    `
}

const drawComponents = async (loader) => {
    const [titles, loadBar, cube] = await Promise.all([
/*         addTextComponents(loader, document.querySelector(".titlesBox")),
        addProgressBar(loader, document.querySelector(".barBox")),
 */        addCube(loader, document.querySelector(".animationSection"))
    ])

    return {
        'landingContainer': document.querySelector(".landingContainer"),
        'bars': {
            top: document.querySelector(".topDarkBar"),
            bottom: document.querySelector(".bottomDarkBar")
        },
        'titlesBox': document.querySelector(".titlesBox"),
        'appBar': document.querySelector(".barBox"),
        'access': document.querySelector("#access"),
        'components': {
/*             titleLevel: titles[0],
            titleFrame: titles[1],
            loadBar: loadBar,
 */            cube: cube
        }
    }
}

const addCube = async (loader, box) => {
    const config = {
        id: "landing-cube3d",
        tag: "cube-3d",
/*         deps: {
            helper: "dom",
            class: "base"
        },
 */        css: {
            box_perspective: "900px",
            box_size: "300px",
            box_back: "rgba(0, 0, 0, 0)",
            box_border: "2px solid rgb(32, 32, 32)",
            box_shadow: "inset 0 0 50px rgb(32, 32, 32)"
        }
    }

    const component = await loader.prepare(box, config)
    component.init()
/*     return cubeComponent
 */ }

const addTextComponents = async (loader, box) => {
    const componentMod = await level.helper.import.object({
        "module": `${level.route}/framework/components/nano/text/animated_text-01.js`
    })
    const helpers = {
        'dom': level.helper.dom
    }
    const deps = {
        'base': `${level.route}/framework/dependencies/classes/class_base.js`,
        'fonts': `${level.route}/framework/dependencies/classes/class_fonts.js`
    }

    /* top title */
    const topCss = {
        charBox_back: "rgb(46, 46, 46)",
        charBox_radius: "4px",
        charBox_margin: "5px",
        charBox_padding: "10px 14px",
        char_fontSize: "40px",
        char_fontFamily: "garden",
        char_fontColor: "rgb(220, 220, 220)",
        char_fontWeight: "bolder"
    }

    const titleTop = level.helper.dom.add(box, componentMod.module.tag, "topTitle relative")
    await level.helper.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => titleTop.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => titleTop.deps[key] = value)
    titleTop.data.text = "Level"
    titleTop.fonts = [{ 'name': 'garden', 'src': `${level.route}/app/src/fonts/Neuropol.otf` }]
    titleTop.css = topCss

    /* bottom title */
    const bottomCss = {
        char_empty: "30px",
        char_fontSize: "32px",
        char_fontFamily: "other",
        char_fontColor: level.helper.css.getVar("landingColor1"),
    }

    const titleBottom = level.helper.dom.add(box, componentMod.module.tag, "bottomTitle")
    Object.entries(deps).forEach(([key, value]) => titleBottom.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => titleBottom.deps[key] = value)
    titleBottom.data.text = "Modular framework"
    titleBottom.fonts = [{ 'name': 'other', 'src': `${level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
    titleBottom.css = bottomCss

    /* components html flow */
    box.prepend(titleBottom)
    box.prepend(titleTop)
    titleTop.init()
    titleBottom.init()

    return [titleTop, titleBottom]
}

const addProgressBar = async (loader, box) => {
    const componentMod = await level.helper.import.object({
        "module": `${level.route}/framework/components/nano/progress/progress_bar-01.js`
    })
    const helpers = {
        'dom': level.helper.dom,
        'css': level.helper.css,
        'events': level.helper.events,
        'timers': level.helper.timers
    }
    const deps = {
        'base': `${level.route}/framework/dependencies/classes/class_base.js`,
        'fonts': `${level.route}/framework/dependencies/classes/class_fonts.js`
    }
    const css = {
        box_radius: "4px",
        box_padding: "4px",

        progress_height: "24px",
        progress_back: "rgba(0, 0, 0, 0.6)",
        progress_radius: "4px",
        progress_fontFamily: "ds-digi",
        progress_fontSize: "14px",
        progress_fontColor: "rgb(200, 200, 200)",
        progress_fontWeight: "bolder",
        progress_letterSpacing: "2px",

        item_widthOff: "calc(100% - 2px)",
        item_heightOff: "100%",
        item_radiusOff: "4px",
        item_borderOff: "1px solid rgba(0, 0, 0, 0.2)",

        item_widthOn: "14px",
        item_heightOn: "10px",
        item_radiusOn: "0px",
        item_borderOn: "1px solid rgba(0, 0, 0, 0.2)",

        transition: "250ms ease-out"
    }
    const data = { items_multiplier: 2, progress_length: 2, progress_steps: 5 }

    const barComponent = level.helper.dom.add(box, componentMod.module.tag)
    await level.helper.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => barComponent.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => barComponent.deps[key] = value)
    barComponent.css = css
    barComponent.data = data
    barComponent.fonts = [{ 'name': 'ds-digi', 'src': `${level.route}/app/src/fonts/ds-digi.ttf` }]

    barComponent.init()
}

const animateIn = async (boxes) => {
    /* aimacion darkBar */
    boxes.bars.top.style.top = "0px"
    boxes.bars.bottom.style.bottom = "0px"
    await level.helper.timers.awaitTransition(boxes.bars.top)
    /*  */
    boxes.landingContainer.classList.replace("invisible", "visible")
    await level.helper.timers.awaitTransition(boxes.landingContainer)
    boxes.appBar.classList.remove("invisible")
    boxes.appBar.classList.add("barBox_down", "visible")
    level.helper.events.send("algo", { value: 1 })
}

const addEvents = (boxes) => {
    boxes.access.addEventListener("click", () => {
        exit()
    })
    document.addEventListener("appLoad", (e) => {
/*         console.log(e.detail.loaded)
 */    })
}

export const init = async () => {
    console.log("appLoading - landing")
    const loader = await import(`${level.route}/framework/runtime/loader.js`)

    drawLanding(loader)
    const boxes = await drawComponents(loader)
    await animateIn(boxes)
    addEvents(boxes)
    return true
}

const exit = async () => {
    console.log("access")
}