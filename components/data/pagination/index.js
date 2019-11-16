import XPagination from './src/pagination'

XPagination.install = function(Vue) {
    Vue.content(XPagination.name, XPagination)
}

export default XPagination
