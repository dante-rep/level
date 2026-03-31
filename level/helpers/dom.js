export const add = (box, tag, classes = null, id = null) => {
    const newTag = document.createElement(tag)
    id && (newTag.id = id)
    classes && (newTag.className = classes)
    box.appendChild(newTag)
    return newTag
}