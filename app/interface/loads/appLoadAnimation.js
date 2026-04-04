const drawAnimation = (help) => {
    const animationContainer = help.dom.add(document.body, "div", "animationContainer max center relative")
    animationContainer.innerHTML = `
    <div class="scene center">
        <ul class="backBox absolute"></ul>
        <ul class="frontBox absolute"><div class="imposible absolute"></div></ul>
    </div>
    `
    return animationContainer
}

const generateCss = (help) => {
    const style = help.dom.add(document.head, "style", "appAnimation")
    style.textContent = `
    :root {
        --circles: none;
        --animationTransition: 4s ease-in-out;
        --rotatePerspective: 90deg;
    }

    .animationContainer {
        opacity: 0;
        transition: var(--animationTransition);
        perspective: 600px;
        border: 2px solid red;

        .scene {
            width: 80%;
            height: 80%;
            transform-style: preserve-3d;
            transform-origin: left;
            border: 10px solid green;
        }

        .backBox,
        .frontBox {
            transform-style: preserve-3d;
            left: 20%;
            display: flex;
            align-items: center;
            width: 100%;
            aspect-ratio: 2/1;
            border: 4px solid red;
            transform: rotateY(var(--rotatePerspective));
            transition: var(--animationTransition);
            transform-origin: center;
        }

        .circle {
        }

        .circle_back {
            z-index: 1;
            height: 100%;
            aspect-ratio: 1/1;
            transform: rotateY(calc(var(--rotatePerspective) * -1)) rotateZ(45deg);
            border: 4px solid rgba(0, 0, 0, 0.21);
            border-top-color: transparent;
            border-right-color: transparent;
            border-radius: 20%;
            transition: var(--animationTransition);

            .secondCircle {
                width: calc(100% - 40px);
                aspect-ratio: 1 / 1;
                border: 2px solid rgba(0, 0, 0, 0.21);
                border-top-color: transparent;
                border-right-color: transparent;
                border-radius: 20%;
                outline: 20px solid red;
            }
        }

        .circle_front {
            z-index: 3;
            height: 100%;
            aspect-ratio: 1/1;
            transform: rotateY(calc(var(--rotatePerspective) * -1)) rotateZ(-135deg);
            border: 4px solid rgba(0, 0, 0, 0.21);
            border-top-color: transparent;
            border-right-color: transparent;
            border-radius: 20%;
            transition: var(--animationTransition);

            .secondCircle {
                width: calc(100% - 40px);
                aspect-ratio: 1 / 1;
                border: 2px solid rgba(0, 0, 0, 0.21);
                border-top-color: transparent;
                border-right-color: transparent;
                border-radius: 20%;
            }
        }

        .imposible {
            transform:  translateX(2000px) rotateY(calc(var(--rotatePerspective) * -1));
            transform-origin: center;
            width: 200px;
            height: 200px;
            background: grey;
            transition: var(--animationTransition);
        }
    }

    .animationContainer_visible {
        opacity: 1;
    }

    .relative {position; relative;}
    .absolute {position: absolute;}
    .max {width: 100%; height: 100%;}
    .center {display: flex; justify-content: center; align-items: center;}
    `
    return style
}

const drawLayers = (help, animation, style) => {
    const back = animation.querySelector(".backBox")
    const front = animation.querySelector(".frontBox")
    const boxWidth = back.offsetWidth
    console.log(boxWidth)
    const circles = 6
    style.textContent += `:root {--circles: ${circles};`

    for (let cont = 0; cont < circles; cont++) {
        const circle = help.dom.add(back, "div", "circle_back circle absolute center")
        circle.style.left = `${(boxWidth / circles) * cont}px`
        circle.style.opacity = 1 - (cont / (circles * 2))
        const secondCircle = help.dom.add(circle, "div", "secondCircle")
        secondCircle.style.opacity = 1 - (cont / (circles * 4))
    }
    for (let cont = 0; cont < circles; cont++) {
        const circle = help.dom.add(front, "div", "circle_front circle absolute center")
        circle.style.left = `${(boxWidth / circles) * cont}px`
        circle.style.opacity = 1 - (cont / (circles * 2))
        const secondCircle = help.dom.add(circle, "div", "secondCircle")
        secondCircle.style.opacity = 1 - (cont / (circles * 4))
    }

}

const controlAnimation = async (help, animation, style) => {
    const time = window.level.help.css.getTimeProp("--animationTransition")
    animation.classList.add("animationContainer_visible")
/*     await new Promise(resolve => setTimeout(resolve, time))
 */    console.log("rotate")
    const back = animation.querySelector(".backBox")
    const front = animation.querySelector(".frontBox")
    const imposible = animation.querySelector(".imposible")

    back.style.transform = "rotateY(33deg)"
    front.style.transform = "rotateY(33deg)"
    Array.from(animation.querySelectorAll(".circle_back")).forEach(item =>
        item.style.transform = "rotateY(-33deg) rotateZ(45deg)"
    )
    Array.from(animation.querySelectorAll(".circle_front")).forEach(item =>
        item.style.transform = "rotateY(-33deg) rotateZ(-135deg)"
    )
    await new Promise(resolve => setTimeout(resolve, time))
    imposible.style.transform = "translateX(0px) rotateY(-45deg)"
}

export const init = async () => {
    console.log("appLoading - animation")
    const help = window.level.help
    const style = generateCss(help)
    const animation = drawAnimation(help)
    drawLayers(help, animation, style)
    await controlAnimation(help, animation, style)
}

export const exit = async () => {

}