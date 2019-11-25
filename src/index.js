import Button from '../components/currency/button'
import ButtonGroup from '../components/currency/button-group'
import Icon from '../components/currency/icon'
import Collapse from '../components/Exhibition/collapse'
import CollapseItem from '../components/Exhibition/collapse-item'
import Row from '../components/layout/row'
import Table from '../components/data/table'


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

