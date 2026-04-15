export const getTransition = (element) => {
    const valueSplit = getComputedStyle(element).getPropertyValue("transition").trim().split(" ")
    const timePart = valueSplit.find(time => time.endsWith("s") || time.endsWith("ms"))
    if (!timePart) {
        console.error(element, "cant get transition value")
        return 0
    }
    return timePart.endsWith("ms")
        ? parseFloat(timePart)
        : parseFloat(timePart) * 1000
}

export const awaitTransition = async (element) => {
    const time = getTransition(element)
    await new Promise(resolve => setTimeout(resolve, time))
}