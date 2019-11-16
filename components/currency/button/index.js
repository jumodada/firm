import XButton from './src/button'

XButton.install = function(Vue) {
    Vue.content(XButton.name, XButton)
}

export default XButton
