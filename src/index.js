import Button from '../components/button'
import ButtonGroup from '../components/button-group'
import Icon from '../components/icon'
import Collapse from '../components/collapse'
import CollapseItem from '../components/collapse-item'
import Row from '../components/layout/row'
import Table from '../components/table'


const components = [
    Button,
    Icon,
    Collapse,
    CollapseItem,
    Row,
    ButtonGroup,
    Table
]

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default {
    version: '0.0.1',
    install,
    Button,
    Icon,
    Table
}

