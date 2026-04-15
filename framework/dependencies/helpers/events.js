export const send = (eventName, detail, dom = null) => {
    if (!eventName) {
        console.error("no eventName configured")
        return
    }
    if (detail === null || detail === undefined) {
        console.error("no detail configured")
        return
    }
    if (typeof detail !== "object") {
        console.error("detail must be an object or null")
        return
    }
    !dom && (dom = document)
    dom.dispatchEvent(new CustomEvent(eventName, { 'detail': detail }))
}

export const recibe = (eventName, callback, dom = null) => {
    if (!eventName) {
        console.error("no eventName configured")
        return
    }
    if (!callback || typeof (callback) !== "function") {
        console.error("no callback configured")
        return
    }
    !dom && (dom = document)
    dom.addEventListener(eventName, (e) => {
        callback(e.detail)
    })
}