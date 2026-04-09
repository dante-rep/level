const drawLanding = async (help) => {
    const landingContainer = help.dom.add(document.body, "div", "landingContainer max center relative")
    const titlesBox = help.dom.add(landingContainer, "div", "titlesBox")


    const componentMod = await help.import.object({ 
        "module": "/frameWork/components/nano/text/animatedText.js"
     })
    const deps = {
        'dom': '/frameWork/dependencies/helpers/dom.js',
        'base': '/frameWork/dependencies/classes/class_base.js',
        'fonts': '/frameWork/dependencies/classes/class_fonts.js'
    }
    await help.import.object(deps)

    const titleTop = help.dom.add(titlesBox, componentMod.module.tag)

    titleTop.fonts = [{ 'name': 'predators', 'src': `${window.level.route}/app/src/fonts/CodePredators-Regular.otf` }]
    titleTop.css = {
        charBox_border: "1px solid grey",
        charBox_radius: "6px",
        charBox_margin: "5px",
        charBox_padding: "10px",
        char_top: "-20px",
        char_empty: "30px",
        char_fontSize: "80px",
        char_fontFamily: "predators",
        char_fontColor: "initial",
    }
    titleTop.data.text = "level"

    Object.entries(deps).forEach(([key, value]) => titleTop.deps[key] = value.default ?? value)
    titleTop.init()

    const titleBottom = help.dom.add(titlesBox, componentMod.module.tag)
/*     titleBottom.init()
 */}

export const init = async () => {
    console.log("appLoading - landing")
    const help = window.level.help
    const landingContainer = await drawLanding(help)
}

export const exit = async () => {

}