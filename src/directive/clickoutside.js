export default {
    bind(el, binding) {
        function handler(e) {
            if (el.contains(e.target)) return false
            if (binding.expression) binding.value(e)
        }
        el._click_outside_handler = handler
        document.addEventListener('click', handler)
    },
    unbind(el) {
        document.removeEventListener('click', el._click_outside_handler)
        delete el._click_outside_handler
    }
};