import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Footer from './footer'
import Slider from './slider'
import Content from './content'
import plugin from './plugin.js'
import tabs from './tabs'
import tabsHead from './tabs-head'
import tabsBody from './tabs-body'
import tabsItem from './tabs-item'
import tabsPane from './tabs-panel'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-header', Header)
Vue.component('g-footer', Footer)
Vue.component('g-slider', Slider)
Vue.component('g-content', Content)
Vue.component('g-tabs', tabs)
Vue.component('g-tabs-header', tabsHead)
Vue.component('g-tabs-body', tabsBody)
Vue.component('g-tabs-item', tabsItem)
Vue.component('g-tabs-panel', tabsPane)
Vue.use(plugin)


new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: false,
        loading3: false,
        value: 'v-model'
    },
    methods: {
        inputChange(e) {
            console.log(e)
        },
        Change(e) {
            console.log(e)
        },
        blur(e) {
            console.log(e)
        },
        focus(e) {
            console.log(e)
        },
        showMsg1() {
            this.$toast('这是一条成功信息',{
                type:'success',
                position:'top',
            })
        },
        showMsg2() {
            this.$toast('这是一警告信息',{
                type:'warn',
                position:'center'
            })
        },
        showMsg3() {
            this.$toast('这是一条错误信息',{
                type:'error',
                position:'bottom'
            })
        },
        showMsg4() {
            this.$toast('默认',{
                position:'top'
            })
        },

    },


})




