const drawLanding = (help) => {
    document.body.innerHTML += `
    <section class="landingSection max center invisible transition1s">
            <div class="contentBox column center transition1s">
                <div class="titlesBox column_Hcenter transition1s">
                    <div class="titleTopBox"></div>
                    <div class="titleBottomBox transition1s"></div>
                </div> 
                <div class="cubeBox invisible transition1s"></div>
                <div class="listBox invisible transition1s">
                    <ul class="terminal columnCenterSpace"></ul>
                    <div class="progressBox"></div>
                </div>
            </div>
    </section>
    `
    return {
        'landingSection': document.querySelector(".landingSection"),
        'contentBox': document.querySelector(".contentBox"),
        'titlesBox': document.querySelector(".titlesBox"),
        'titleTopBox': document.querySelector(".titleTopBox"),
        'titleBottomBox': document.querySelector(".titleBottomBox"),
        'cubeBox': document.querySelector(".cubeBox"),
        'listBox': document.querySelector(".listBox"),
        'terminal': document.querySelector(".terminal"),
        'progressBox': document.querySelector(".progressBox")
    }
}

const drawComponents = async (loader, boxes) => {
    const [topTitle, bottomTitle, cube, axisX, axisY, progressBar] = await Promise.all([
        addTitleTop(loader, boxes.titleTopBox),
        addTitleBottom(loader, boxes.titleBottomBox),
        addCube(loader, boxes.cubeBox),
        addAxisX(loader, boxes.cubeBox),
        addAxisY(loader, boxes.cubeBox),
        addProgressBar(loader, boxes.progressBox),
    ])

    return {
        'topTitle': topTitle,
        'bottomTitle': bottomTitle,
        'cube': cube,
        'axisX': axisX,
        'axisY': axisY,
        'progressBar': progressBar,
    }
}

const addCube = async (loader, box) => {
    const config = {
        id: "landing-cube3d",
        tag: "cube_3d",
        css: {
            box_perspective: "500px",
            box_size: "200px",
            box_back: "rgba(0, 0, 0, 0)",
            box_border: "1px solid rgb(32, 32, 32)",
            box_shadow: "inset 0 0 10px rgb(32, 32, 32)",
            transition: "1500ms ease-in-out"
        }
    }

    const component = await loader.prepare(box, config, "cube-3d")
    component.init()
    return component
}

const addAxisY = async (loader, box) => {
    const config = {
        id: "landing-axisY",
        tag: "axis_ticks_01",
        css: {
            box_width: "50px",
            box_height: "100%",
            steps_fontFamily: "ronduit",
            steps_fontSize: "9px",
            simplePoint_width: "2px",
            simplePoint_height: "1px",
            halfPoint_width: "5px",
            halfPoint_height: "1px",
            stepPoint_width: "5px",
            stepPoint_height: "5px",
            stepPoint_back: "rgba(0, 0, 0, 0.4)",
            valueBox_fontFamily: "ronduit",
            valueBox_fontSize: "9px",
            valueBox_fontStyle: "italic"
        },
        logic: {
            orientation: "vertical"
        },
        data: { steps: 4, values: 4 },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/ronduitCapitals-Light.woff` }]
    }

    const component = await loader.prepare(box, config, "axisY")
    component.init()
    return component
}

const addAxisX = async (loader, box) => {
    const config = {
        id: "landing-axisX",
        tag: "axis_ticks_01",
        css: {
            box_width: "100%",
            box_height: "50px",
            steps_fontFamily: "ronduit",
            steps_fontSize: "9px",
            simplePoint_width: "1px",
            simplePoint_height: "2px",
            halfPoint_width: "1px",
            halfPoint_height: "5px",
            stepPoint_width: "5px",
            stepPoint_height: "5px",
            stepPoint_back: "rgba(0, 0, 0, 0.4)",
            valueBox_fontFamily: "ronduit",
            valueBox_fontSize: "9px",
            valueBox_fontStyle: "italic"
        },
        data: { steps: 4, values: 4 },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/ronduitCapitals-Light.woff` }]
    }

    const component = await loader.prepare(box, config, "axisX")
    component.init()
    return component
}

const addTitleTop = async (loader, box) => {
    const config = {
        id: "topTitle",
        tag: "animated_text_01",
        css: {
            charBox_back: level.helper.css.getVar("landingColor1"),
            charBox_radius: "4px",
            charBox_margin: "5px",
            charBox_padding: "10px 14px",
            char_fontSize: "36px",
            char_fontFamily: "neuropol",
            char_fontColor: "rgb(220, 220, 220)",
            char_fontWeight: "bolder"
        },
        data: { text: "Level" },
        fonts: [{ 'name': 'neuropol', 'src': `${level.route}/app/src/fonts/neuropol.otf` }]
    }

    const component = await loader.prepare(box, config)
    component.init()
    return component
}

const addTitleBottom = async (loader, box) => {
    const config = {
        id: "bottomTitle",
        tag: "animated_text_01",
        css: {
            char_empty: "16px",
            char_fontSize: "16px",
            char_fontFamily: "ronduit",
            char_fontColor: level.helper.css.getVar("landingColor1"),
            char_fontWeight: "bolder"
        },
        data: { text: "Modular framework" },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/ronduitCapitals-Light.woff` }]
    }

    const component = await loader.prepare(box, config)
    component.init()
    return component
}

const addProgressBar = async (loader, box) => {
    const config = {
        id: "landingProgressBar",
        tag: "progress_bar_01",
        css: {
            box_radius: "4px",
            box_padding: "4px 0px",

            progress_width: "80px",
            progress_border: "1px solid rgba(0, 0, 0, 0.14)",
            progress_radius: "4px",
            progress_fontFamily: "ds-digi",
            progress_fontSize: "14px",
            progress_fontColor: "rgb(154, 154, 154)",
            progress_fontWeight: "bolder",
            progress_letterSpacing: "2px",

            item_width: "80%",
            item_height: "56%",
            item_radius: "2px",
            item_border: "1px solid rgba(0, 0, 0, 0.2)",
            item_backOff: "rgba(0, 0, 0, 0)",
            item_backOn: "rgb(56, 56, 56)",
            transition: "500ms"
        },
        logic: { side: "right" },
        data: { items: 25, steps: 5, delay: 5 },
        fonts: [{ 'name': 'ds-digi', 'src': `${level.route}/app/src/fonts/ds-digi.ttf` }]
    }


    const component = await loader.prepare(box, config)
    component.init()
    return component
}

const addBackground = async (loader, box) => {
    const config = {
        id: "adaptativeGrid",
        tag: "adaptative_grid",
        css: {
            box_width: "200%",
            box_height: "140%",
            cell_width: "40px",
            cell_height: "40px",
            cell_borderColor: "rgba(0, 0, 0, 0.4)"
        },
    }

    const component = await loader.prepare(box, config, "backMatrix absolute")
    component.autoResize = true
    component.init()
    return component
}

const animateIn = async (boxes, components) => {
    /* animation visivility */
    boxes.landingSection.classList.replace("invisible", "visible")
    await level.helper.timer.awaitTransition(boxes.landingSection)
    /* expand contentBox */
    boxes.contentBox.classList.add("contentBox_expanded")
    boxes.cubeBox.classList.add("cubeBox_expanded")
    boxes.listBox.classList.add("listBox_expanded")
    await level.helper.timer.awaitTransition(boxes.cubeBox)
    /* change visibility */
    boxes.cubeBox.classList.replace("invisible", "visible")
    boxes.listBox.classList.replace("invisible", "visible")
    await level.helper.timer.awaitTransition(boxes.cubeBox)
}

const createCommandsBoxes = (boxes) => {
    const terminal_height = boxes.terminal.offsetHeight
    const height_multiplier = 1.16
    const terminal_padding = parseFloat(getComputedStyle(boxes.terminal).padding)
    const li_height = parseFloat(getComputedStyle(boxes.listBox).getPropertyValue("--commandLine_height"))
    const optimalList = Math.floor((terminal_height - 2 * terminal_padding) / (li_height * height_multiplier))
    for (let i = 0; i < optimalList; i++) { 
        const commandLine = level.helper.dom.add(boxes.terminal, "li", "commandLine row_between") 
        const commandLine_text = level.helper.dom.add(commandLine, "span", "commandLine_text verticalCenter")
    }
    return boxes.terminal.querySelectorAll(".commandLine")
}

const animateList = async (commandLines, boxes) => {
    const delay = 24
    const font = [{ 'name': 'whiteRabit', 'src': `${level.route}/app/src/fonts/whitrabt-webfont.woff` }]
    await level.helper.fonts.addFonts(font)
    const terminalText = [
        "Hacking the blockchain",
        "Following the white rabbit",
        "Download the internet here",
        "Calculating <div>'s center",
        "Mining with the coffee machine",
        "Loading the illuminati's code",
        "Calibrating the flux capacitor",
        "Generating random errors on kernel",
        "Loading malicious code",
        "Updating Skynet's terms of service",
    ]

    for (let i = 0; i < commandLines.length; i++) {
        const commandLine_text = commandLines[i].querySelector(".commandLine_text")
        commandLine_text.classList.add("commandLine_borderPre")
        await level.helper.timer.sleep(50)
        commandLine_text.classList.replace("commandLine_borderPre", "commandLine_borderOn")

        await level.helper.animate.simple({
            text: terminalText[i],
            type: "text",
            animation: "terminal",
            symbol: " ▄",
            box: commandLines[i].querySelector(".commandLine_text"),
            delay: delay
        })
        const command_done = level.helper.dom.add(commandLines[i], "span", "commandLine_done center")
        command_done.textContent = "Done"
        await level.helper.timer.sleep(220)
    }
}

const calculeCubeAnimation = (value) => {
    if (value < 100) {
        return {
            'x': level.helper.util.randomRange(0, 360),
            'y': level.helper.util.randomRange(0, 360)
        }
    } else {
        return { 'x': 0, 'y': 0 }
    }
}

const cubeAnimation = async (components, values) => {
    components.cube.rotate("x", values.x)
    components.cube.rotate("y", values.y)
    await level.helper.timer.sleep(1500)
}

const calculeAxisValues = (cubeValues) => {
    const axisY_height = document.getElementById("landing-axisY").shadowRoot.querySelector(".pointsCont").offsetHeight
    const axisX_width = document.getElementById("landing-axisX").shadowRoot.querySelector(".pointsCont").offsetWidth
    const x = (cubeValues.x / 360) * axisX_width;
    const y = (cubeValues.y / 360) * axisY_height;
    const xPercent = (x / axisX_width) * 100;
    const yPercent = (y / axisY_height) * 100;
    return { 'x': Math.round(xPercent), 'y': Math.round(yPercent) }
}

const addEvents = (boxes, components) => {
    const progressTask = { 'queue': Promise.resolve() }
    const cubeTasks = { 'queue': Promise.resolve() }
    const oldValues = { x: 0, y: 0 }

    document.addEventListener("appLoad", (e) => {
        progressTask.queue = progressTask.queue.then(async () => {
            let cubeValues = {}
            let difference_x, difference_y
            do {
                cubeValues = calculeCubeAnimation(e.detail.progress)
                difference_x = Math.abs(cubeValues.x - oldValues.x)
                difference_y = Math.abs(cubeValues.y - oldValues.y)
            } while (e.detail.progress < 100 && ((difference_x < 90 || difference_x > 270) || (difference_y < 90 || difference_y > 270)))
            const axisValues = calculeAxisValues(cubeValues)

            if (e.detail.progress === 100) {
                components.axisX.updateCss({ "transition": "6s ease-out" })
                components.axisY.updateCss({ "transition": "6s ease-out" })
                components.cube.updateCss({ "transition": "6s ease-in-out" })
            }

            components.progressBar.changeValue(e.detail.progress)
            components.axisY.updateValue(axisValues.y)
            components.axisX.updateValue(axisValues.x)

            await level.helper.timer.sleep(500)
            await cubeAnimation(components, cubeValues)

            oldValues.x = cubeValues.x
            oldValues.y = cubeValues.y
            await level.helper.timer.sleep(300)
        })
    })
}

export const init = async () => {
    console.log("appLoading - landing")
    const loader = await import(`${level.route}/framework/runtime/loader.js`)

    const boxes = drawLanding(loader)
    const components = await drawComponents(loader, boxes)
    await animateIn(boxes, components)
    const commandLines = createCommandsBoxes(boxes)
    animateList(commandLines, boxes)
    addEvents(boxes, components)
    return true
}