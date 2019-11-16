import XCarousel from './src/carousel'

XCarousel.install = function(Vue) {
    Vue.content(XCarousel.name, XCarousel)
}

export default XCarousel
