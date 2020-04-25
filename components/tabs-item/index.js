import tabItem from '../tabs/src/tabs-item.vue'

tabItem.install = function(Vue) {
    Vue.component(tabItem.name, tabItem)
}

export default tabItem
