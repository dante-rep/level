const drawLanding = (help) => {
    const landingContainer = help.dom.add(document.body, "div", "landingContainer max")
    const titlesSection = help.dom.add(landingContainer, "section", "titlesSection center")
    const titlesBox = help.dom.add(titlesSection, "div", "titlesBox")
    return {'landingContainer': landingContainer, 'titlesBox': titlesBox}
}

const addTextComponents = async (help, boxes) => {
    const componentMod = await help.import.object({
        "module": "/frameWork/components/nano/text/animatedText.js"
    })
    const deps = {
        'dom': '/frameWork/dependencies/helpers/dom.js',
        'base': '/frameWork/dependencies/classes/class_base.js',
        'fonts': '/frameWork/dependencies/classes/class_fonts.js'
    }
    await help.import.object(deps)

    /* top title */
    const titleTop = help.dom.add(boxes.titlesBox, componentMod.module.tag)
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
    const titleBottom = help.dom.add(boxes.titlesBox, componentMod.module.tag, "bottomTitle relative")
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

export const init = async () => {
    console.log("appLoading - landing")
    const help = window.level.help
    const boxes = drawLanding(help)
    await addTextComponents(help, boxes)
}

export const exit = async () => {

}