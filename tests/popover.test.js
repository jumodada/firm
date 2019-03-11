const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.be.ok
    })
    it('可以设置position', (done) => {
        Vue.component('x-popover',Popover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
        <x-popover position="left" ref="a">
            <template slot="content" slot-scope="close">
                <div>支持内部关闭</div>
                <x-button @click="close.close">
                    关闭
                </x-button>
            </template>
            <button>关闭</button>
        </x-popover>`
        const vm = new Vue({
            el:div
        })
        console.log(vm.$el)
        vm.$nextTick(()=>{
            vm.$el.querySelector('x-button').click()

            setTimeout(()=>{
                expect(vm.$refs.a.$refs.contentWrapper.classList.contains('position-left')).to.eq(true)
                done()
            },200)
        })
    })
    xit('可以设置trigger', (done) => {
        Vue.component('x-popover',Popover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
        <x-popover position="left" ref="a" trigger="hover">
            <template slot="content">
                <div>支持内部关闭</div>
                <x-button @click="close.close">
                    关闭
                </x-button>
            </template>
            <button>关闭</button>
        </x-popover>`
        const vm = new Vue({
            el:div
        })
        // let event = new Event('mouseenter')
        // vm.$el.dispatchEvent(event)
        vm.$nextTick(()=>{
            const {contentWrapper}  =vm.$refs.a.$refs
            expect(contentWrapper).to.exist
            done()
        })
    })
})
