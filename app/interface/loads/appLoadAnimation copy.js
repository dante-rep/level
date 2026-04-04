const drawAnimation = (help, conf) => {
    const container = help.dom.add(document.body, "div", "container max center")
    container.innerHTML = `
    <div class="scene relative">
        <div class="scene_3d max absolute">
            <ul class="side backBox absolute max"> </ul>
            <ul class="side frontBox absolute max"></ul>
        </div>
    </div>
    `
    conf.scene = container.querySelector(".scene_3d")
}

const generateCss = (help, conf) => {
    const style = help.dom.add(document.head, "style", "appAnimation")
    style.textContent = `
    @font-face {
        font-family: 'MiFuente';
        src: url('./app/src/fonts/nerdropol_lattice.otf') format('opentype');
    }

    :root {
        --animationTransition: ${conf.time_3d};
        --rotate: 0deg;
    }

    .container {
        display: flex;
        align-items: center;
        transition: var(--animationTransition);

        .scene {
            width: ${conf.box_width};
            height: ${conf.box_height};
            opacity: 1;
            perspective: ${conf.perspective}px;

            .scene_3d {
                transform: rotateY(var(--rotate));
                transform-style: preserve-3d;
                transform-origin: right;
/*                 border: 3px solid blue;
 */                transition: var(--animationTransition);
            }
        }

        .backBox,
        .frontBox {
            transform-style: preserve-3d;
            transform: rotateY(0deg);
            transform-origin: right;

            .mark {
                position: absolute;
                transition: var(--animationTransition);
                border: 3px solid rgba(0, 0, 0, 0.4);
                border-radius: 20px;
                filter: blur(1px);
            }
        }

        .objectBox {
            transform:  translateZ(calc(${conf.marks} * ${Number(conf.markSpacing)}px));
            transform-origin: center;
            transition: 30s;

            .object {
                width: 400px;
                height: 400px;
                border: 4px solid grey;
                border-radius: 50%;
/*                 background: rgba(0, 0, 0, 0.4);
 */                filter: blur(100px);
                opacity: 0;
                transition: 6s;

                color: white;
                font-size: 170px;
                font-family: MiFuente;
            }
        }
    }

    .relative {position: relative;}
    .absolute {position: absolute;}
    .max {width: 100%; height: 100%;}
    .center {display: flex; justify-content: center; align-items: center;}
    .transition {transition: var(--animationTransition);}
    .container_visible {opacity: 1;}
    .markLeft {clip-path: polygon(0 0, 30% 0%, 30% 100%, 0% 100%);}
    .markRight {clip-path: polygon(70% 0, 100% 0, 100% 100%, 70% 100%);}
    .backBox .objectBox .objectVisible {opacity: 1; filter: blur(0px);}
    `
    conf.style = style
}

const drawLayers = (help, conf) => {
    console.log(conf)
    const back = conf.scene.querySelector(".backBox")
    const front = conf.scene.querySelector(".frontBox")

    for (let cont = 0; cont < conf.marks; cont++) {
        const backItem = help.dom.add(back, "div", `mark markLeft pos_${cont} absolute max`)
        const frontItem = help.dom.add(front, "div", `mark markRight pos_${cont} absolute max`)
    }

    const box = document.querySelector(".scene_object")
    const objectBox = help.dom.add(back, "div", "objectBox absolute center max")
    const object = help.dom.add(objectBox, "div", "object center")
    object.textContent ="LEVEL"
    console.log(object)
    conf.objectBox = objectBox
}

const controlAnimation = async (help, conf) => {
    conf.scene.classList.add("container_visible")
    const time = parseFloat(conf.time_3d) * 1000
    await new Promise(resolve => setTimeout(resolve, 500))
    /* 3d */
    const items = Array.from(conf.scene.querySelectorAll(".mark"))
    for (let index = 0; index < conf.marks; index++) {
        const boxes = items.filter(item => item.classList.contains(`pos_${index}`))
        boxes.forEach(item => item.style.transform = `translateZ(${conf.markSpacing * index}px)`)
    }
    await new Promise(resolve => setTimeout(resolve, time))
    /* rotate */
    document.documentElement.style.setProperty("--rotate", `${conf.rotate}`)
    await new Promise(resolve => setTimeout(resolve, time))
    /* translate */
    conf.objectBox.style.transform = "translateZ(1px)"
    const object = conf.objectBox.querySelector(".object")
    object.classList.add("objectVisible")
}

export const init = async () => {
    const conf = {
        style: null,
        box_width: "800px",
        box_height: "450px",
        marks: 15,
        box: null,
        object: null,
        markSpacing: -300,
        perspective: 900,
        rotate: "-10deg",
        time_3d: "2s ease-in-out"
    }
    console.log("appLoading - animation")
    const help = window.level.help
    const style = generateCss(help, conf)
    const animation = drawAnimation(help, conf)
    drawLayers(help, conf)
    await controlAnimation(help, conf)
}

export const exit = async () => {

}