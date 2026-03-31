const addComponentContainer = (help, box) => {
    const componentContainer = help.dom.add(box, "div", "componentContainer")
}

export const init = () => {
    const help = window.level.help
    addComponentContainer(help, document.body)
}