const drawLanding = async (help) => {
    const landingContainer = help.dom.add(document.body, "div", "landingContainer invisible max")
    landingContainer.innerHTML = `
        <section class="titlesSection column">
            <div class="titlesBox column"></div>
            <input id="access" type="button" class="button" value="Access">
        </section>
        <section class="animationSection center"></section>
    `

    const titlesBox = landingContainer.querySelector(".titlesBox")
    const animationSection = landingContainer.querySelector(".animationSection")
    const [, cube] = await Promise.all([addTextComponents(help, titlesBox), addCube(help, animationSection)])
    console.log(cube)
    landingContainer.classList.replace("invisible", "visible")
    return {
        'access': landingContainer.querySelector("#access"),
        'cube': cube
    }
}

const addCube = async (help, box) => {
    const componentMod = await help.import.object({
        "module": "/framework/components/nano/geometry/cube.js"
    })
    const deps = {
        'dom': '/framework/dependencies/helpers/dom.js',
        'base': '/framework/dependencies/classes/class_base.js'
    }
    await help.import.object(deps)

    const cubeComponent = help.dom.add(box, componentMod.module.tag)
    const css = {
        box_perspective: "900px",
        box_size: "300px",
        box_back: "rgba(0, 0, 0, 0)",
        box_border: "2px solid rgb(32, 32, 32)",
        box_shadow: "inset 0 0 50px rgb(32, 32, 32)"
    }
    cubeComponent.css = css
    Object.entries(deps).forEach(([key, value]) => cubeComponent.deps[key] = value.default ?? value)
    cubeComponent.init()
    return cubeComponent
}

const addTextComponents = async (help, box) => {
    const componentMod = await help.import.object({
        "module": "/framework/components/nano/text/animatedText.js"
    })
    const deps = {
        'dom': '/framework/dependencies/helpers/dom.js',
        'base': '/framework/dependencies/classes/class_base.js',
        'fonts': '/framework/dependencies/classes/class_fonts.js'
    }
    await help.import.object(deps)

    /* top title */
    const titleTop = help.dom.add(box, componentMod.module.tag, "topTitle relative")
    titleTop.fonts = [{ 'name': 'garden', 'src': `${window.level.route}/app/src/fonts/Neuropol.otf` }]
    titleTop.css = {
        charBox_back: "rgb(46, 46, 46)",
        charBox_radius: "4px",
        charBox_margin: "5px",
        charBox_padding: "10px 14px",
        char_fontSize: "40px",
        char_fontFamily: "garden",
        char_fontColor: "rgb(220, 220, 220)",
        char_fontWeight: "bolder"
    }
    titleTop.data.text = "Level"
    Object.entries(deps).forEach(([key, value]) => titleTop.deps[key] = value.default ?? value)
    titleTop.init()

    /* bottom title */
    const titleBottom = help.dom.add(box, componentMod.module.tag, "bottomTitle")
    titleBottom.fonts = [{ 'name': 'other', 'src': `${window.level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
    titleBottom.css = {
        char_empty: "30px",
        char_fontSize: "32px",
        char_fontFamily: "other",
        char_fontColor: "rgb(46, 46, 46)"
    }
    titleBottom.data.text = "Modular framework"
    Object.entries(deps).forEach(([key, value]) => titleBottom.deps[key] = value.default ?? value)
    titleBottom.init()
}

const addEvents = (items) => {
    console.log(items)
    items.access.addEventListener("click", () => {
        exit()
    })
    document.addEventListener("appLoad", (e) => {
        console.log(e.target.value)
    })
}

export const init = async () => {
    console.log("appLoading - landing")
    const help = window.level.help
    const items = await drawLanding(help)
    addEvents(items)
}

const exit = async () => {
    const help = window.level.help
    console.log("access")
}