import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)

new Vue({
    el: '#app',

    data:{
        loading1:false,
        loading2:false,
        loading3:false
    },
    methods:{
        inputChange(e){
            console.log(e.target.value)
        },
        Change(e){
            console.log(e.target.value)
        },
        blur(e){
            console.log(e)
        },
        focus(e){
            console.log(e)
        }
    }
})

