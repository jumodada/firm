import XTable from './src/table'

XTable.install = function(Vue) {
    Vue.content(XTable.name, XTable)
}

export default XTable
