const drawLanding = async (help) => {
    const componentMod = await help.import.object({ "module": "./../../components/nano/text/animatedText.js" })
    const landingContainer = help.dom.add(document.body, "div", "landingContainer max center relative")
    const titlesBox = help.dom.add(landingContainer, "div", "titlesBox")
    const titleTop = help.dom.add(titlesBox, componentMod.module.tag)

    titleTop.fonts = [{ 'name': 'predators', 'src': `${window.level.route}/app/src/fonts/CodePredators-Regular.otf` }]
    titleTop.css = {
        font_size: "80px",
        font_family: "predators",
        font_color: "initial",
        font_style: "initial",

        char_margin: "5px",
        char_padding: "10px",
        char_empty: "30px"
    }

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