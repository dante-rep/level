const drawLanding = async (help) => {
    document.body.innerHTML += `
        <div class="darkBar topDarkBar absolute transition1s"></div>
        <div class="landingContainer invisible max transition08s">
            <section class="titlesSection column">
                <div class="titlesContainer columnCenter">
                    <div class="titlesBox column"></div>
                    <div class="progressBox invisible transition05s"></div>
                </div> 
                <input id="access" type="button" class="button hidden" value="Access">
            </section>
            <section class="animationSection center"></section>
        </div>
        <div class="darkBar bottomDarkBar absolute transition1s"></div>
    `
}

const drawComponents = async (loader) => {
    const [topTitle, bottomTitle, progressBar, cube] = await Promise.all([
        addTitleTop(loader, document.querySelector(".titlesBox")),
        addTitleBottom(loader, document.querySelector(".titlesBox")),
        addProgressBar(loader, document.querySelector(".progressBox")),
        addCube(loader, document.querySelector(".animationSection"))
    ])

    return {
        'landingContainer': document.querySelector(".landingContainer"),
        'bars': {
            'top': document.querySelector(".topDarkBar"),
            'bottom': document.querySelector(".bottomDarkBar")
        },
        'titlesBox': document.querySelector(".titlesBox"),
        'appBar': document.querySelector(".progressBox"),
        'access': document.querySelector("#access"),
        'components': {
            'topTitle': topTitle,
            'bottomTitle': bottomTitle,
            'progressBar': progressBar,
            'cube': cube
        }
    }
}

const addCube = async (loader, box) => {
    const config = {
        id: "landing-cube3d",
        tag: "cube_3d",
        css: {
            box_perspective: "900px",
            box_size: "300px",
            box_back: "rgba(0, 0, 0, 0)",
            box_border: "2px solid rgb(32, 32, 32)",
            box_shadow: "inset 0 0 50px rgb(32, 32, 32)"
        }
    }

    const component = await loader.prepare(box, config)
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
            char_fontSize: "40px",
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
            char_empty: "30px",
            char_fontSize: "32px",
            char_fontFamily: "other",
            char_fontColor: level.helper.css.getVar("landingColor1"),
        },
        data: { text: "Modular framework" },
        fonts: [{ 'name': 'other', 'src': `${level.route}/app/src/fonts/RonduitCapitals-Light.woff` }]
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
            box_padding: "4px",

            progress_height: "24px",
            progress_back: "rgba(0, 0, 0, 0.6)",
            progress_radius: "4px",
            progress_fontFamily: "ds-digi",
            progress_fontSize: "14px",
            progress_fontColor: "rgb(200, 200, 200)",
            progress_fontWeight: "bolder",
            progress_letterSpacing: "2px",

            item_widthOff: "calc(100% - 2px)",
            item_heightOff: "100%",
            item_radiusOff: "4px",
            item_borderOff: "1px solid rgba(0, 0, 0, 0.2)",

            item_widthOn: "4px",
            item_heightOn: "4px",
            item_radiusOn: "50%",
            item_backOn: "rgb(255, 255, 255)",
            item_boxShadowOn: "0 0 4px rgb(46, 46, 46), 0 0 8px rgb(46, 46, 46)",

            transition: "350ms ease-out"
        },
        data: { items_multiplier: 3, progress_length: 3, progress_steps: 5 },
        fonts: [{ 'name': 'ds-digi', 'src': `${level.route}/app/src/fonts/ds-digi.ttf` }]
    }

    const component = await loader.prepare(box, config)
    component.init()
    return component
}

const animateIn = async (boxes) => {
    /* animation darkBar */
    boxes.bars.top.style.top = "0px"
    boxes.bars.bottom.style.bottom = "0px"
    await level.helper.timers.awaitTransition(boxes.bars.top)
    /*  */
    boxes.landingContainer.classList.replace("invisible", "visible")
    await level.helper.timers.awaitTransition(boxes.landingContainer)
    boxes.appBar.classList.remove("invisible")
    boxes.appBar.classList.add("progressBox_down", "visible")
    level.helper.events.send("algo", { value: 1 })
}

const addEvents = (boxes) => {
    boxes.access.addEventListener("click", () => {
        exit()
    })
    document.addEventListener("appLoad", (e) => {
/*         console.log(e.detail.loaded)
 */    })
}

export const init = async () => {
    console.log("appLoading - landing")
    const loader = await import(`${level.route}/framework/runtime/loader.js`)

    drawLanding(loader)
    const boxes = await drawComponents(loader)
    await animateIn(boxes)
    addEvents(boxes)
    return true
}

const exit = async () => {
    console.log("access")
}