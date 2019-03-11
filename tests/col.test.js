const expect = chai.expect;
import Vue from 'vue'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
    it('存在.', () => {
        expect(Col).to.be.ok
    })
    it('接受span属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                span: 1
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受offset属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                offset: 1
            }
        }).$mount(div)

        expect(vm.$el.classList.contains('offset-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受pc属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                pc: {
                    span:1,
                    offset:1
            }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-pc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-pc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受iPad属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                pad: {
                    span:1,
                    offset:1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-iPad-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-iPad-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受np属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                np: {
                    span:1,
                    offset:1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-narrowPc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-narrowPc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受wp属性',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const  Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                wp: {
                    span:1,
                    offset:1
                }
            }
        }).$mount(div)

        expect(vm.$el.classList.contains('col-widePc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-widePc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })

})
