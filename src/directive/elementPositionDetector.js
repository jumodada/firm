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
        el._element_position_detector  = handler
        el._$scrollParents = $parents
    },
    unbind(el) {
        if(!el._$scrollParents)el._$scrollParents = getAllScrollParents(el)
        el._$scrollParents.forEach(node => {
            if (node) node.removeEventListener('scroll',el._element_position_detector)
        })
        window.removeEventListener('resize',el._element_position_detector)
        delete el._element_position_detector
        delete el._$scrollParents

    }
}