import {getAllScrollParents} from "../utils/window"

export default {
    inserted(el, binding){
        function handler(e) {
            if (binding.expression) binding.value(e)
        }
        let $parents =  getAllScrollParents(el)
        $parents.forEach(node => {
            if (node) node.addEventListener('scroll', handler)
        })
        window.addEventListener('resize', handler)
        el._clickHandler = handler
        el._$scrollParents = $parents
    },
    unbind(el) {
        if(!el._$scrollParents)el._$scrollParents = getAllScrollParents(el)
        el._$scrollParents.forEach(node => {
            if (node) node.removeEventListener('scroll',el._clickHandler)
        })
        window.removeEventListener('resize',el._clickHandler)
        delete el._clickHandler
        delete el._$scrollParents

    }
}