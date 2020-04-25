import progress from './src/progress'

progress.install = function(Vue) {
    Vue.component(progress.name, progress)
}

export default progress
