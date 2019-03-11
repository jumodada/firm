const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    it('存在.', () => {
        expect(Toast).to.be.ok
    })


})

describe('props', function () {
    it('接受 autoClose', (done) => {
        let div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Toast)
        const vm = new Constructor({
            propsData: {
                autoClosed: 1,
            }
        }).$mount(div)
        vm.$on('close', () => {
            expect(document.body.contains(vm.$el)).to.eq(false)
            done()
        })
    })
    it('接受 closeButton', () => {
        const callback = sinon.fake()
        const Constructor = Vue.extend(Toast)
        const vm = new Constructor({
            propsData: {
                autoClosed: 1,
                closeButton:{
                    text:'x',
                    callback:callback
                }
            }
        }).$mount()

        let closeButton = vm.$el.querySelector('.close')
        expect(closeButton.textContent.trim()).to.eq('x')
        closeButton.click()
         expect(callback).to.have.been.called

    })
    it('接受 enableHTML', () => {

        const Constructor = Vue.extend(Toast)
        const vm = new Constructor({
            propsData: {
                enableHTML:true
            }
        })
            vm.$slots.default = ['<strong id="test">test</strong>']
          vm.$mount()
            let test = vm.$el.querySelector('#test')
        expect(test).to.be.ok
    })
    it('接受 position', () => {

        const Constructor = Vue.extend(Toast)
        const vm = new Constructor({
            propsData: {
                position:'center'
            }
        }).$mount()
       expect(vm.$el.classList.contains('position-center')).to.eq(true)
    })
})
