
const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const mousewheel = function(element, callback,name) {
    if (element && element.addEventListener) {
        element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function(event) {
            callback && callback.apply(this, [event,name]);
        });
    }
};

export default {
    bind(el, binding,name) {
        mousewheel(el, binding.value,name);
    }
};
