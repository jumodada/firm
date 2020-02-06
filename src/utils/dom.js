export const on = (function() {
    return function(element, event, handler) {
        element.addEventListener(event, handler, false)
    }
})()

export const off = (function() {
    return function(element, event, handler) {
        element.removeEventListener(event, handler, false)
    }
})()
