import input from './src/input'

input.install = function(Vue) {
    Vue.component(input.name, input)
}

export default input
