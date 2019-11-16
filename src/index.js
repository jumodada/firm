import Button from '../components/currency/button'
import Icon from '../components/currency/icon'

const components = [
    Button,
    Icon
]

const install = function (Vue) {
    components.forEach(component => Vue.content(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '0.0.1',
    install,
    Button,
    Icon
}

