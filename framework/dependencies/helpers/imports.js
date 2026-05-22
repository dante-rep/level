export const object = async (obj) => {
    await Promise.all(Object.entries(obj).map(async ([name, url]) => {
        if (typeof (obj[name]) === "string") {
            const module = await import(url)
            obj[name] = module.default ?? module
        }
    }))
    return obj
}

export const fonts = (font) => {
    let fontStyle = document.head.querySelector(".dynamicStyle_fonts")
    if (!fontStyle) {
        fontStyle = document.createElement("style")
        fontStyle.classList.add("dynamicStyle_fonts")
        document.head.appendChild(fontStyle);
    }

    const formatMap = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype", eot: "embedded-opentype" }
    const previousNAME = fontStyle.textContent.includes(font.name)
    const previousSRC = fontStyle.textContent.includes(font.src)
    const ext = font.src.split(".").pop()
    const format = formatMap[ext] || ext

    if (!previousNAME && !previousSRC) fontStyle.textContent += `
        @font-face {
            font-family: "${font.name}";
            src: url("${font.src}") format("${format}");
            font-display: swap;
        }`
}