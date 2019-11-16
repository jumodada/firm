import XPopover from './src/popover'

XPopover.install = function(Vue) {
    Vue.content(XPopover.name, XPopover)
}

export default XPopover
