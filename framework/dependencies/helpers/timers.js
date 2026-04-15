export const getTransition = (element) => {
    const value = getComputedStyle(element).getPropertyValue("transition")
    if (value.endsWith("ms")) return parseFloat(value)
    if (value.endsWith("s")) return parseFloat(value) * 1000
}



export const awaitTransition = async (element) => {
    const time = getTransition(element)
    console.log(time, element)
    await new Promise(resolve => setTimeout(resolve, time))
}