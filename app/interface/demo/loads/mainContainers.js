const addComponentContainer = (help, box) => {
    const componentContainer = help.dom.add(box, "div", "componentContainer")
    const backLayer = help.dom.add(componentContainer, "div", "backLayer")
    const componentBox = help.dom.add(componentContainer, "div", "componentBox")
}

export const init = () => {
    console.log("containers")
    const help = window.level.help
    addComponentContainer(help, document.body)
}