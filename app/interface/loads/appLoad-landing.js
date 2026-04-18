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

    const [titles, loadBar, cube] = await Promise.all([
        addTextComponents(help, document.querySelector(".titlesBox")),
        addProgressBar(help, document.querySelector(".barBox")),
        addCube(help, document.querySelector(".animationSection"))
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
            titleLevel: titles[0],
            titleFrame: titles[1],
            loadBar: loadBar,
            cube: cube
        }
    }
}

const addCube = async (help, box) => {
    const componentMod = await help.import.object({
        "module": `${window.level.route}/framework/components/nano/geometry/cube_3d.js`
    })
    const helpers = {
        'dom': help.dom
    }
    const deps = {
        'base': `${window.level.route}/framework/dependencies/classes/class_base.js`
    }
    const css = {
        box_perspective: "900px",
        box_size: "300px",
        box_back: "rgba(0, 0, 0, 0)",
        box_border: "2px solid rgb(32, 32, 32)",
        box_shadow: "inset 0 0 50px rgb(32, 32, 32)"
    }

    const cubeComponent = help.dom.add(box, componentMod.module.tag)
    await help.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => cubeComponent.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => cubeComponent.deps[key] = value)
    cubeComponent.css = css

    cubeComponent.init()
    return cubeComponent
}

const addTextComponents = async (help, box) => {
    const componentMod = await help.import.object({
        "module": `${window.level.route}/framework/components/nano/text/animated_text-01.js`
    })
    const helpers = {
        'dom': help.dom
    }
    const deps = {
        'base': `${window.level.route}/framework/dependencies/classes/class_base.js`,
        'fonts': `${window.level.route}/framework/dependencies/classes/class_fonts.js`
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

    const titleTop = help.dom.add(box, componentMod.module.tag, "topTitle relative")
    await help.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => titleTop.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => titleTop.deps[key] = value)
    titleTop.data.text = "Level"
    titleTop.fonts = [{ 'name': 'garden', 'src': `${window.level.route}/app/src/fonts/Neuropol.otf` }]
    titleTop.css = topCss

    /* bottom title */
    const bottomCss = {
        char_empty: "30px",
        char_fontSize: "32px",
        char_fontFamily: "other",
        char_fontColor: help.css.getVar("landingColor1"),
    }

    const titleBottom = help.dom.add(box, componentMod.module.tag, "bottomTitle")
    Object.entries(deps).forEach(([key, value]) => titleBottom.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => titleBottom.deps[key] = value)
    titleBottom.data.text = "Modular framework"
    titleBottom.fonts = [{ 'name': 'other', 'src': `${window.level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
    titleBottom.css = bottomCss

    /* components html flow */
    box.prepend(titleBottom)
    box.prepend(titleTop)
    titleTop.init()
    titleBottom.init()

    return [titleTop, titleBottom]
}

const addProgressBar = async (help, box) => {
    const componentMod = await help.import.object({
        "module": `${window.level.route}/framework/components/nano/progress/progress_bar-01.js`
    })
    const helpers = {
        'dom': help.dom,
        'css': help.css,
        'events': help.events,
        'timers': help.timers
    }
    const deps = {
        'base': `${window.level.route}/framework/dependencies/classes/class_base.js`,
        'fonts': `${window.level.route}/framework/dependencies/classes/class_fonts.js`
    }
    const css = {
        box_border: "1px solid grey",
        box_radius: "4px",
        box_padding: "4px",

        info_fontFamily: "qqq",
/*         info_border: "1px solid grey",
 */        info_radius: "2px",

        item_width: "calc(100% - 4px)",
        item_height: "12px",
        item_radius: "4px",
        item_borderOn: "1px solid grey",
        item_borderOff: "1px solid grey",
        item_backOn: help.css.getVar("landingColor1"),

        transition: "300ms ease-out"
    }
    const data = {items: 24, infoLenght: 4}

    const barComponent = help.dom.add(box, componentMod.module.tag)
    await help.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => barComponent.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => barComponent.deps[key] = value)
    barComponent.css = css
    barComponent.data = data
    barComponent.fonts = [{ 'name': 'qqq', 'src': `${window.level.route}/app/src/fonts/ds-digi.ttf` }]

    barComponent.init()
}

const animateIn = async (help, boxes) => {
    /* aimacion darkBar */
    boxes.bars.top.style.top = "0px"
    boxes.bars.bottom.style.bottom = "0px"
    await help.timers.awaitTransition(boxes.bars.top)
    /*  */
    boxes.landingContainer.classList.replace("invisible", "visible")
    await help.timers.awaitTransition(boxes.landingContainer)
    boxes.appBar.classList.remove("invisible")
    boxes.appBar.classList.add("barBox_down", "visible")
    help.events.send("algo", {value: 1})
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
    const help = window.level.help
    const boxes = await drawLanding(help)
    await animateIn(help, boxes)
    addEvents(boxes)
    return true
}

const exit = async () => {
    const help = window.level.help
    console.log("access")
}