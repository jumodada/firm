import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Button from '@/button.vue'
import sinon from 'sinon'
import sinonchai from 'sinon-chai'
import Vue from "vue";
chai.use(sinonchai)

describe('button', () => {
    it('存在', () => {
        const wrapper = mount(Button,{
            propsData:{
                icon:'set'
            }
        })
        expect(wrapper).to.exist
    })
    it('可以设置icon.', () => {
       const wrapper = mount(Button,{
           propsData:{
               icon:'set'
           }
       })
        const useElement = wrapper.find('use')
        expect(useElement.attributes()['href']).to.equal('#icon-set')

    })
    it('可以设置loading.', () => {
        const wrapper = mount(Button,{
            propsData: {
                icon: 'loading',
                loading: true
            }
        })
        const vm = wrapper.vm
        const useElements = vm.$el.querySelectorAll('use')
        expect(useElements.length).to.equal(1)

        expect(useElements[0].getAttribute('xlink:href')).to.equal('#icon-loading')
    })
    it('icon 默认的 order 是 1', () => {

        const wrapper = mount(Button,{
            propsData: {
                icon: 'set',
            }
        })
        const vm = wrapper.vm
        const icon = vm.$el.querySelector('svg')
        expect(getComputedStyle(icon).order).to.eq('1')
    })
    it('设置 iconPosition 可以改变 order', () => {
       const wrapper = mount(Button,{
           propsData: {
               icon: 'set',
               position: 'right'
           }
       })
        const vm = wrapper.vm
        const icon = vm.$el.querySelector('svg')
        expect(getComputedStyle(icon).order).to.eq('2')
    })
    //deep比较对象,属性是否相同
    it('点击 button 触发 click 事件', () => {

        const wrapper = mount(Button,{
             propsData:{
                 icon:'set'
             }
        })

        const vm = wrapper.vm
        const callback = sinon.fake();
        vm.$on('click', callback)
        vm.$el.querySelector('button').click()
        expect(callback).to.have.been.called

    })
})
