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
import xTabs from './tabs'
import xTabsItem from './tabs-item'
import popover from './popover'
import collapse from './collapse'
import collapseItem from './collapse-item'

Vue.component('x-button', Button)
Vue.component('x-icon', Icon)
Vue.component('x-button-group', ButtonGroup)
Vue.component('x-input', Input)
Vue.component('x-row', Row)
Vue.component('x-col', Col)
Vue.component('x-layout', Layout)
Vue.component('x-header', Header)
Vue.component('x-footer', Footer)
Vue.component('x-slider', Slider)
Vue.component('x-content', Content)
Vue.component('x-tabs', xTabs)
Vue.component('x-tabs-item', xTabsItem)
Vue.component('x-popover', popover)
Vue.component('x-collapse', collapse)
Vue.component('x-collapse-item', collapseItem)
Vue.use(plugin)


new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: false,
        loading3: false,
        value: 'v-model',
        selectedTab: '1',
        selectedTT:['1']
    },
    methods: {
        yyy(val){
          console.log(val)
        },
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




