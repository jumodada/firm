export default {
    bind(el, binding) {
        function handler(e) {
            if (el.contains(e.target)) return false
            if (binding.expression) binding.value(e)
        }
        binding._clickHandler = handler
        document.addEventListener('click', handler)
    },
    unbind(el,binding) {
        document.removeEventListener('click', binding._clickHandler)
    }
};