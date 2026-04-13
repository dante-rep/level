const drawLanding = async (help) => {
    const landingContainer = help.dom.add(document.body, "div", "landingContainer invisible max")
    landingContainer.innerHTML = `
        <section class="titlesSection column">
            <div class="titlesContainer columnCenter">
                <div class="titlesBox column"></div>
                <div id="barBox" class="barBox"></div>
            </div> 
            <input id="access" type="button" class="button hidden" value="Access">
        </section>
        <section class="animationSection center"></section>
    `

    const [, cube] = await Promise.all([
        addTextComponents(help, landingContainer.querySelector(".titlesBox")),
        addProgressBar(help, landingContainer.querySelector(".barBox")),
        addCube(help, landingContainer.querySelector(".animationSection"))])
    return {
        'landingContainer': landingContainer,
        'bar': landingContainer.querySelector("#barBox"),
        'access': landingContainer.querySelector("#access"),
        'cube': cube
    }
}

const addCube = async (help, box) => {
    const componentMod = await help.import.object({
        "module": `${window.level.route}/framework/components/nano/geometry/cube.js`
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
        "module": `${window.level.route}/framework/components/nano/text/animatedText.js`
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
        char_fontColor: "rgb(46, 46, 46)"
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
}

const addProgressBar = async (help, box) => {
    const componentMod = await help.import.object({
        "module": `${window.level.route}/framework/components/nano/progress/infoBar.js`
    })
    const helpers = {
        'dom': help.dom,
        'css': help.css
    }
    const deps = {
        'base': `${window.level.route}/framework/dependencies/classes/class_base.js`,
        'fonts': `${window.level.route}/framework/dependencies/classes/class_fonts.js`
    }
    const css = {
        box_border: "1px solid grey",
        box_radius: "8px",
        box_padding: "6px",
        info_width: "80px",
        info_height: "100%",
        info_border: "1px solid grey",
        info_radius: "4px",
        itemBar_width: "18px",
        itemBar_height: "20px",
        itemBar_borderOff: "1px solid grey",
        itemBar_radius: "4px",
    }

    const barComponent = help.dom.add(box, componentMod.module.tag)
    await help.import.object(deps)
    Object.entries(deps).forEach(([key, value]) => barComponent.deps[key] = value.default)
    Object.entries(helpers).forEach(([key, value]) => barComponent.deps[key] = value)
    barComponent.css = css

    barComponent.init()
}

const animateIn = async (help, boxes) => {
    boxes.landingContainer.classList.replace("invisible", "visible")
    await help.timers.awaitTransition(boxes.landingContainer)

    boxes.bar.classList.add("barBox_expand")
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