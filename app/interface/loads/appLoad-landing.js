const drawLanding = (help) => {
    document.body.innerHTML += `
    <section class="landingSection max relative">
        <div class="landingBack verticalCenter max absolute"></div>
        <div class="darkBar topDarkBar absolute transition1s"></div>
        <div class="landingBox invisible max transition1s">
            <section class="titlesSection center column">
                <div class="titlesContainer columnCenter transition1s">
                    <div class="titleTopBox"></div>
                    <div class="titleBottomBox transition1s"></div>
                    <input id="access" type="button" class="button hidden" value="Access">
                </div> 
                <div class="progressBox invisible transition1s"></div>
            </section>
            <section class="animationSection center">
                <div class="animationBox">

                </div>
            </section>
        </div>
        <div class="darkBar bottomDarkBar absolute transition1s"></div>
    </section>
    `
    return {
        'landingSection': document.querySelector(".landingSection"),
        'landingBack': document.querySelector(".landingBack"),
        'topBar': document.querySelector(".topDarkBar"),
        'bottomBar': document.querySelector(".bottomDarkBar"),
        'landingBox': document.querySelector(".landingBox"),
        'titlesContainer': document.querySelector(".titlesContainer"),
        'titleTopBox': document.querySelector(".titleTopBox"),
        'titleBottomBox': document.querySelector(".titleBottomBox"),
        'progressBox': document.querySelector(".progressBox"),
        'access': document.querySelector("#access"),
        'animationBox': document.querySelector(".animationBox")
    }
}

const drawComponents = async (loader, boxes) => {
    const [backMatrix, topTitle, bottomTitle, progressBar, cube, axisX, axisY] = await Promise.all([
        addBackground(loader, boxes.landingBack),
        addTitleTop(loader, boxes.titleTopBox),
        addTitleBottom(loader, boxes.titleBottomBox),
        addProgressBar(loader, boxes.progressBox),
        addCube(loader, boxes.animationBox),
        addAxisX(loader, boxes.animationBox),
        addAxisY(loader, boxes.animationBox)
    ])

    return {
        'backAdaptative': backMatrix,
        'topTitle': topTitle,
        'bottomTitle': bottomTitle,
        'progressBar': progressBar,
        'cube': cube,
        'axisX': axisX,
        'axisY': axisY
    }
}

const addCube = async (loader, box) => {
    const config = {
        id: "landing-cube3d",
        tag: "cube_3d",
        css: {
            box_perspective: "500px",
            box_size: "300px",
            box_back: "rgba(0, 0, 0, 0)",
            box_border: "2px solid rgb(32, 32, 32)",
            box_shadow: "inset 0 0 50px rgb(32, 32, 32)",
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
        data: { steps: 8 },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
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
        data: { steps: 8 },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
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
            charBox_back: "rgb(46, 46, 46)",
            charBox_radius: "4px",
            charBox_margin: "5px",
            charBox_padding: "10px 14px",
            char_fontSize: "44px",
            char_fontFamily: "garden",
            char_fontColor: "rgb(220, 220, 220)",
            char_fontWeight: "bolder"
        },
        data: { text: "Level" },
        fonts: [{ 'name': 'garden', 'src': `${level.route}/app/src/fonts/Neuropol.otf` }]
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
            char_empty: "20px",
            char_fontSize: "24px",
            char_fontFamily: "ronduit",
            char_fontColor: "rgba(0, 0, 0, 0.42)",
            char_fontWeight: "bolder"
        },
        data: { text: "Modular framework" },
        fonts: [{ 'name': 'ronduit', 'src': `${level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
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
            box_width: "100%",
            box_height: "24px",
            box_radius: "4px",

            progress_height: "20px",
            progress_back: "rgba(0, 0, 0, 0.7)",
            progress_radius: "4px",
            progress_fontFamily: "ds-digi",
            progress_fontSize: "14px",
            progress_fontColor: "rgb(154, 154, 154)",
            progress_fontWeight: "bolder",
            progress_letterSpacing: "2px",

            item_widthOff: "calc(100% - 2px)",
            item_heightOff: "80%",
            item_radiusOff: "2px",
            item_backOff: "rgba(0, 0, 0, 0)",
            item_borderOff: "1px solid rgba(0, 0, 0, 0.2)",

            item_widthOn: "calc(100% - 2px)",
            item_heightOn: "60%",
            item_borderOn: "1px solid rgba(0, 0, 0, 0)",
            item_borderOn: "1px solid rgba(0, 0, 0, 0.2)",
            item_radiusOn: "2px",
            item_backOn: "rgba(22, 22, 22, 0.58)",

            transition: "300ms ease-out"
        },
        data: { items_multiplier: 4, progress_length: 2, progress_steps: 5 },
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
    /* animation darkBar */
    boxes.topBar.style.top = "0px"
    boxes.bottomBar.style.bottom = "0px"
    await level.helper.timer.awaitTransition(boxes.topBar)
    /* animation visivility */
    boxes.landingBox.classList.replace("invisible", "visible")
    await level.helper.timer.awaitTransition(boxes.landingBox)
    /* expand container & move title */
    boxes.titlesContainer.classList.add("titlesContainer_expanded")
    boxes.titleBottomBox.classList.add("titleBottomBox_desplazed")
    /* progress bar */
    boxes.progressBox.classList.replace("invisible", "visible")
    await level.helper.timer.awaitTransition(boxes.landingBox)
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
    return { 'x': Math.round(cubeValues.x / axisX_width * 100), 'y': Math.round(cubeValues.y / axisY_height * 100) }
}

const changeBack = () => {

}

const addEvents = (boxes, components) => {
    const progressTask = { 'queue': Promise.resolve() }
    const cubeTasks = { 'queue': Promise.resolve() }
    const oldValues = { x: 0, y: 0 }

    boxes.access.addEventListener("click", () => {
        exit()
    })

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
            /*  */
            components.backAdaptative.updateCss({ "rotate": `${(e.detail.progress / 100) * 40}deg` })
            /*  */
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
    addEvents(boxes, components)
    return true
}

const exit = async () => {
    console.log("access")
}