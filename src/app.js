import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)

new Vue({
    el: '#app',



    data:{
        loading1:false,
        loading2:false,
        loading3:false
    }
})
import  chai from 'chai'
const expect = chai.expect
import spies from 'chai-spies'
chai.use(spies)
//单元测试
try{
    {

        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        console.log(Constructor)
        const button = new Constructor({
            propsData:{
                icon:'set',
                loading:true
            }
        })
        console.log(button)
        button.$mount(div)
        let useElement  = button.$el.querySelector('use')
        console.log(useElement);
        let href = useElement.getAttribute('xlink:href')
        expect(href).to.eq('#icon-set')
        button.$el.remove()
        button.$destroy()
    }
    {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        console.log(Constructor)
        const button = new Constructor({
            propsData:{
                icon:'set',
                loading:true
            }
        })
        console.log(button)
        button.$mount(div)
        let svg  = button.$el.querySelector('svg')
        console.log(svg);
        let {order} = window.getComputedStyle(svg)
        console.log(order)
        expect(order).to.eq('1')
        button.$el.remove()
        button.$destroy()
    }

    {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const button = new  Constructor({
            propsData:{
                icon:'set',
                loading:true,
                iconPosition:'right'
            }
        })
        button.$mount(div)

        let svg = button.$el.querySelector('svg')
        let {order} = window.getComputedStyle(svg)
        console.log(order)
        expect(order).to .eq('2')
        button.$el.remove()
        button.$destroy()

    }
    {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const button = new Constructor({
            propsData:{
                icon:'set'
            }
        })
        button.$mount(div)
        let button$el = button.$el
        let spy = chai.spy(()=>{})

        button.$on('click',spy)
        button$el.click()
        console.log(button$el)
        expect(spy).to.have.been.called()
        button.$el.remove()
        button.$destroy()

    }

}catch (error) {
    window.errors = [error]
}finally {
    window.errors&&window.errors.forEach(error=>{
        console.error(error)
    })
}


