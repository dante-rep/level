const drawLanding = (help) => {
    document.body.innerHTML += `
    <section class="landingSection max">
        <div class="darkBar topDarkBar absolute transition1s"></div>
        <div class="landingBox invisible max transition08s">
            <section class="titlesSection center column">
                <div class="titlesContainer column">
                    <div class="titleTopBox"></div>
                    <div class="titleBottomBox"></div>
                </div> 
                <div class="progressBox invisible transition05s"></div>
                <input id="access" type="button" class="button hidden" value="Access">
            </section>
            <section class="animationSection center"></section>
        </div>
        <div class="darkBar bottomDarkBar absolute transition1s"></div>
    </section>
    `
    return {
        'landingSection': document.querySelector(".landingSection"),
        'landingBox': document.querySelector(".landingBox"),
        'topBar': document.querySelector(".topDarkBar"),
        'bottomBar': document.querySelector(".bottomDarkBar"),
        'titleTopBox': document.querySelector(".titleTopBox"),
        'titleBottomBox': document.querySelector(".titleBottomBox"),
        'progressBox': document.querySelector(".progressBox"),
        'access': document.querySelector("#access"),
    }
}

const drawComponents = async (loader, containers) => {
    const [/* backMatrix, */ topTitle, bottomTitle, progressBar, cube, axisX, axisY] = await Promise.all([
/*         addBackground(loader, containers.landingSection),
 */        addTitleTop(loader, containers.titleTopBox),
        addTitleBottom(loader, containers.titleBottomBox),
        addProgressBar(loader, containers.progressBox),
/*         addCube(loader, document.querySelector(".animationSection")),
        addAxisX(loader, document.querySelector(".animationSection")),
        addAxisY(loader, document.querySelector(".animationSection"))
 */    ])

    return {
/*         'backgroundMatrix': backMatrix,
 */        'topTitle': topTitle,
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
            transition: "1.5s ease-in-out"
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
            char_fontSize: "20px",
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
            box_padding: "4px",

            progress_height: "22px",
            progress_back: "rgba(0, 0, 0, 0.7)",
            progress_radius: "4px",
            progress_fontFamily: "ds-digi",
            progress_fontSize: "14px",
            progress_fontColor: "rgb(154, 154, 154)",
            progress_fontWeight: "bolder",
            progress_letterSpacing: "2px",

            item_widthOff: "calc(100% - 2px)",
            item_heightOff: "100%",
            item_radiusOff: "2px",
            item_backOff: "rgba(0, 0, 0, 0)",
            item_borderOff: "1px solid rgba(0, 0, 0, 0.2)",

            item_widthOn: "calc(100% - 2px)",
            item_heightOn: "100%",
            item_borderOn: "1px solid rgba(0, 0, 0, 0)",
            item_borderOn: "1px solid rgba(0, 0, 0, 0.2)",
            item_radiusOn: "2px",
            item_backOn: "rgba(22, 22, 22, 0.58)",

            transition: "300ms ease-out"
        },
        data: { items_multiplier: 4, progress_length: 3, progress_steps: 5 },
        fonts: [{ 'name': 'ds-digi', 'src': `${level.route}/app/src/fonts/ds-digi.ttf` }]
    }

    const component = await loader.prepare(box, config)
    component.init()
    return component
}

const addBackground = async (loader, box) => {

}

const animateIn = async (boxes, components) => {
    console.log(boxes)
    /* animation darkBar */
    boxes.topBar.style.top = "0px"
    boxes.bottomBar.style.bottom = "0px"
    await level.helper.timer.awaitTransition(boxes.topBar)
    /* animation visivility */
    boxes.landingBox.classList.replace("invisible", "visible")
    await level.helper.timer.awaitTransition(boxes.landingBox)
    /* progress bar */
    console.log(components.progressBar)
    boxes.progressBox.classList.remove("invisible")
    boxes.progressBox.classList.add("progressBox_down", "visible")
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

const cubeAnimation = async (boxes, values) => {
    boxes.components.cube.rotate("x", values.x)
    boxes.components.cube.rotate("y", values.y)
    await level.helper.timer.sleep(1500)
}

const calculeAxisValues = (cubeValues) => {
    const axisY_height = document.getElementById("landing-axisY").shadowRoot.querySelector(".pointsCont").offsetHeight
    const axisX_width = document.getElementById("landing-axisX").shadowRoot.querySelector(".pointsCont").offsetWidth
    return { 'x': Math.round(cubeValues.x / axisX_width * 100), 'y': Math.round(cubeValues.y / axisY_height * 100) }
}

const addEvents = (boxes) => {
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
                boxes.components.axisX.updateCss({ "transition": "6s ease-out" })
                boxes.components.axisY.updateCss({ "transition": "6s ease-out" })
                boxes.components.cube.updateCss({ "transition": "6s ease-in-out" })
            }
            boxes.components.progressBar.changeValue(e.detail.progress)
            boxes.components.axisY.updateValue(axisValues.y)
            boxes.components.axisX.updateValue(axisValues.x)
            await level.helper.timer.sleep(500)
            await cubeAnimation(boxes, cubeValues)
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
/*     addEvents(boxes)
 */    return true
}

const exit = async () => {
    console.log("access")
}