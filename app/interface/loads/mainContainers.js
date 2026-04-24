const addComponentContainer = (help, box) => {
    const componentContainer = help.dom.add(box, "div", "componentContainer absolute maxDVH")
    const backLayer = help.dom.add(componentContainer, "div", "backLayer absolute max")
    const componentBox = help.dom.add(componentContainer, "div", "componentBox absolute max")
}

const addBarsContainers = (help, box) => {
    const navContainer = help.dom.add(box, "nav", "navContainer absolute")
    const bottomBarContainer = help.dom.add(box, "div", "bottomBarContainer absolute")
}

const panelsContainers = (help, box) => {
    const menuContainer = help.dom.add(box, "aside", "menuContainer absolute")
    const configContainer = help.dom.add(box, "aside", "configContainer absolute")
}

export const init = () => {
    console.log("containers")
    const help = window.level.help
    addComponentContainer(help, document.body)
    addBarsContainers(help, document.body)
    panelsContainers(help, document.body)
}