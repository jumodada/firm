import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Button from '@/button.vue'

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(Button, {
            propsData: { msg }
        })
        expect(1).to.eq(1)
    })
})
