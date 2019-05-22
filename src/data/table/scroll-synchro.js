

const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const data={
    currentScrollLeft:0,
    currentScrollTop:0,
}
const wheel =  function fixedWheel(e,target,scrollArea){
    const currentScrollTop = target.scrollTop
    if(e.deltaY< 0&& currentScrollTop === 0|| e.deltaY> 0 && target.scrollHeight - target.clientHeight === currentScrollTop){
        event.preventDefault()
        return
    }
    if (e.deltaY< 0 && currentScrollTop !== 0) {
        event.preventDefault()
    }
    if (e.deltaY> 0 && target.scrollHeight - target.clientHeight > currentScrollTop) {
        event.preventDefault()
    }
    scrollArea.scrollTop += e.deltaY
}

const scroll = function (event,el,partArr) {
    let {scrollTop} = el
    if(data.currentScrollTop===scrollTop)return
    data.currentScrollTop=scrollTop
    partArr[0].children[1].scrollTop = scrollTop
    if(el.className.indexOf('right')>-1){
        partArr[1].children[1].scrollTop = scrollTop
    }else{
        partArr[2].children[1].scrollTop = scrollTop
    }
}
const xScroll = function(el,value,scrollArea,partArr) {
    if (el && el.addEventListener) {
         el.addEventListener(!isFirefox?'mousewheel':'scroll', function(event) {
             !isFirefox && wheel.apply(this, [event,el,scrollArea,partArr])
             isFirefox && scroll.apply(this, [event,el,partArr])
        })
    }
}

export default {
    bind(el, binding,name) {
        xScroll(el, binding.value,name.context.$el.children[0].children[1],name.context.$el.children);
    },
    data
};
