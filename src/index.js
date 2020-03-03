import Button from '../components/button'
import ButtonGroup from '../components/button-group'
import Input from '../components/Input'
import Icon from '../components/icon'
import Collapse from '../components/collapse'
import CollapseItem from '../components/collapse-item'
import Row from '../components/layout/row'
import Table from '../components/table'
import Upload from '../components/Upload'
import Progress from '../components/progress'
import Popover from '../components/popover'
import Switch from '../components/switch'
import Message from '../components/message'
const components = [
    Button,
    Icon,
    Collapse,
    CollapseItem,
    Row,
    ButtonGroup,
    Table,
    Upload,
    Progress,
    Input,
    Popover,
    Switch
]

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component))
    Vue.prototype.$message = Message
}


if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default {
    version: '0.0.1',
    install,
    Message,
    Button,
    Input,
    Icon,
    Table,
    Upload,
    Progress,
    Popover,
    Switch
}

