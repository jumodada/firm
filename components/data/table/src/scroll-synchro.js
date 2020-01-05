const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const data={
    currentScrollLeft:0,
    currentScrollTop:0,
}
const wheel =  function fixedWheel(e,target){
    const currentScrollTop = target.scrollTop
    if(e.deltaY< 0&& currentScrollTop === 0|| e.deltaY> 0 && target.scrollHeight - target.clientHeight === currentScrollTop){
        e.preventDefault()
        return
    }
    if (e.deltaY< 0 && currentScrollTop !== 0) {
        e.preventDefault()
    }
    if (e.deltaY> 0 && target.scrollHeight - target.clientHeight > currentScrollTop) {
        e.preventDefault()
    }
    let scrollArea = target.parentNode.parentNode.childNodes[0].childNodes[1]
    scrollArea.scrollTop += e.deltaY
}

const scroll = function (event,el) {
    let {scrollTop} = el
    if(data.currentScrollTop===scrollTop)return
    data.currentScrollTop=scrollTop
    el.scrollTop = el.parentNode.parentNode.childNodes[0].childNodes[1].scrollTop = scrollTop
        //todo right
}
const xScroll = function(el,bind,wrapper) {
    if (el && el.addEventListener) {
        el.addEventListener(!isFirefox?'mousewheel':'scroll', function(event) {
            (isFirefox?scroll:wheel).apply(this, [event,el])
        })
    }
}

export default {
    bind(el, binding,name) {
        xScroll(el, binding.value)
    },
    data
};