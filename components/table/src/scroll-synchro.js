import {isFirefox,listenToScroll} from "../../../src/utils/scroll"

const data={
    currentScrollLeft:0,
    currentScrollTop:0,
}
const wheel =  function fixedWheel(e,target){
    console.log(e)
    const currentScrollTop = target.scrollTop
    if(e.deltaY< 0&& currentScrollTop === 0|| e.deltaY> 0 && target.scrollHeight - target.clientHeight === currentScrollTop){
        e.preventDefault()
        return
    }
    if (e.deltaY< 0 && currentScrollTop !== 0) e.preventDefault()
    if (e.deltaY> 0 && target.scrollHeight - target.clientHeight > currentScrollTop) e.preventDefault()
    let scrollArea = target.parentNode.parentNode.childNodes[0].childNodes[1]
    scrollArea.scrollTop += e.deltaY
}

const scroll = function (event,el) {
    console.log(event)
    let {scrollTop} = el
    if(data.currentScrollTop===scrollTop)return
    data.currentScrollTop=scrollTop
    el.scrollTop = el.parentNode.parentNode.childNodes[0].childNodes[1].scrollTop = scrollTop
        //todo right
}

export default {
    bind(el) {
        listenToScroll(el,isFirefox?scroll:wheel)
    },
    data
};