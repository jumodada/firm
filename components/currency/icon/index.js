import XIcon from './src/icon.vue';

XIcon.install = function(Vue) {
    Vue.content(XIcon.name, XIcon);
};

export default XIcon
