import selector from './src/selector'

selector.install = function(Vue) {
    Vue.component(selector.name, selector)
}

export default selector
