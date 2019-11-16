import XButtonGroup from './src/button-group'

XButtonGroup.install = function(Vue) {
    Vue.content(XButtonGroup.name, XButtonGroup)
}

export default XButtonGroup
