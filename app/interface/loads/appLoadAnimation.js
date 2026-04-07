const drawLanding = async (help) => {
    const componentMod = await help.import.object({ "module": "./../components/nano/text/animatedText.js" })
    const landingContainer = help.dom.add(document.body, "div", "landingContainer max center relative")
    const titlesBox = help.dom.add(landingContainer, "div", "titlesBox")
    const titleTop = help.dom.add(titlesBox, componentMod.module.tag)
    const titleBottom = help.dom.add(titlesBox, componentMod.module.tag)
    titleTop.init()
    titleBottom.init()
}

export const init = async () => {
    console.log("appLoading - animation")
    const help = window.level.help
    const landingContainer = await drawLanding(help)
}

export const exit = async () => {

}