import Button from '../components/currency/button'

const components = [
 Button
]

const install = function(Vue) {
  components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
  version: '0.0.1',
  install,
  Button,
}

