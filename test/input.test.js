const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false


describe('Input',()=>{


    it('存在',()=>{
            expect(Input).to.exist
    })

    describe('props',()=>{
        let vm
        const Constructor = Vue.extend(Input)
        afterEach(()=>{
            vm.$destroy()
        })
        it('接受 value',()=>{
           vm = new Constructor({
                propsData: {
                    value: 'ha23io 2'
                }
            }).$mount()
            const input = vm.$el.querySelector('input')
            expect(input.value).to.equal('ha23io 2')
            vm.$destroy()
        })

        it('接受 disabled',()=>{
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const input = vm.$el.querySelector('input')
            expect(input.disabled).to.equal(true)
            vm.$destroy()
        })
        it('接受 readonly',()=>{
             vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const input = vm.$el.querySelector('input')
            expect(input.readOnly).to.equal(true)
            vm.$destroy()
        })
        it('接受 error',()=>{
             vm = new Constructor({
                propsData: {
                    error: true
                }
            }).$mount()
            const usrElement = vm.$el.querySelector('use')
            console.error(usrElement)
            expect(usrElement.getAttribute('xlink:href')).to.equal('#icon-gantan')
            const errorMessage = vm.$el.querySelector('.errorMessage')
            expect(errorMessage).to.exist
            vm.$destroy()
        })
    })
    describe('事件',()=>{
        let vm
        const Constructor = Vue.extend(Input)
        afterEach(()=>{
            vm.$destroy()
        })
        it('支持input,change,focus,blur事件',()=>{
            ['input','change','focus','blur'].forEach(eventName=>{
                vm = new Constructor({}).$mount()
                const callback = sinon.fake()
                vm.$on(eventName,callback)
                let event = new Event(eventName)
                Object.defineProperty(
                    event,'target',
                    {
                        value:{
                        value:'hi'
                        },
                    enumerable:true
        },
                )
                let inputElement = vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)
                //console.log(event)
                expect(callback).to.have.been.calledWith('hi')
            })
        })

    })

})
