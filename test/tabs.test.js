const expect = chai.expect;
import Vue from 'vue'
import tabs from '../src/tabs'


Vue.config.productionTip = false
Vue.config.devtools = false

describe('tabs', () => {
    it('存在', () => {
        expect(tabs).to.be.ok
    })
    // it('子组件接受selected', (done) => {
    //         const div = document.createElement('div')
    //         document.body.appendChild(div)
    //         div.innerHTML = `
    //         <x-tabs selected="1">
    //         <x-tabs-header>
    //             <x-tabs-item name="1">
    //                 <p>游戏王的男人</p>
    //             </x-tabs-item>
    //         <x-tabs-item name="2">
    //            <p>新闻</p>
    //         </x-tabs-item>
    //
    //         </x-tabs-header>
    //         <x-tabs-body>
    //         <x-tabs-panel name="1">
    //            游戏
    //         </x-tabs-panel>
    //         <x-tabs-panel name="2">
    //            新闻
    //         </x-tabs-panel>
    //
    //         </x-tabs-body>
    //         </x-tabs>
    //         `
    //         let vm = new Vue({
    //             el:div
    //         })
    //           vm.$nextTick(()=>{
    //               let x = vm.$el.querySelector('.tabs-item:nth-child(1)')
    //               let style = x.classList.contains('active')
    //               expect(style).to.eq(true)
    //               vm.$el.remove()
    //               vm.$destroy()
    //               done()
    //           })
    //
    //
    // })
    // it('可以接受props:position',()=>{
    //     const div = document.createElement('div')
    //     document.body.appendChild(div)
    //     div.innerHTML = `
    //         <x-tabs selected="1" postion="left">
    //         <x-tabs-header>
    //             <x-tabs-item name="1">
    //                 <p>游戏王的男人</p>
    //             </x-tabs-item>
    //         </x-tabs-item>
    //
    //         </x-tabs-header>
    //         <x-tabs-body>
    //         <x-tabs-panel name="1">
    //            游戏
    //         </x-tabs-panel>
    //
    //         </x-tabs-body>
    //         </x-tabs>
    //         `
    //     let vm = new Vue({
    //         el:div,
    //     })
    //     vm.$nextTick(()=>{
    //         expect(vm.$el.classList.contains('left')).to.eq(true)
    //         vm.$el.remove()
    //         vm.$destroy()
    //     })
    //
    //
    // })

})

describe('tabs-item', () => {
    // it('存在', () => {
    //     expect(tabsItem).to.be.ok
    // })
    // it('接受name属性',()=>{
    //     const Constructor = Vue.extend(tabsItem)
    //     const vm = new Constructor({
    //         propsData:{
    //             name:'xxx',
    //         }
    //     }).$mount()
    //     expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
    // })
    // it('接受disabled属性',()=>{
    //     const Constructor = Vue.extend(tabsItem)
    //     const vm = new Constructor({
    //         propsData:{
    //             disabled:false,
    //         }
    //     }).$mount()
    //     console.log(vm.$el.classList);
    //     const callback = sinon.fake()
    //     vm.$on('click',callback)
    //     vm.$el.click()
    //     expect(callback).to.have.not.been.called
    // })
    //


})
