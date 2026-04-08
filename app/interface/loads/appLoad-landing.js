const drawLanding = async (help) => {
    const landingContainer = help.dom.add(document.body, "div", "landingContainer max center relative")
    const titlesBox = help.dom.add(landingContainer, "div", "titlesBox")


    const componentMod = await help.import.object({ "module": "./../../components/nano/text/animatedText.js" })
    const deps = { 'base': './../classes/class_base.js' }
    await help.import.object(deps)

    const titleTop = help.dom.add(titlesBox, componentMod.module.tag)

    titleTop.fonts = [{ 'name': 'predators', 'src': `${window.level.route}/app/src/fonts/CodePredators-Regular.otf` }]
    titleTop.css = {
        font_size: "80px",
        font_family: "predators",
        font_color: "initial",
        char_margin: "5px",
        char_padding: "10px",
        char_empty: "30px"
    }

    Object.entries(deps).forEach(([key, value]) => titleTop.deps[key] = value.default)
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