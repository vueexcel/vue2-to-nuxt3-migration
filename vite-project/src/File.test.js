
import {describe ,it ,expect} from 'vitest'
import { mount } from '@vue/test-utils'
import File from './components/ListArea.vue'

describe('File Test!' , () => {
    it('should render v-form' , () =>{
        const wrapper = mount(File)
        expect (wrapper.find('v-form').exists()).toBeTruthy()
    })
    it(' v-text-field' , () =>{
        const wrapper = mount(File)
        expect (wrapper.find('v-text-field').exists()).toBeTruthy()
    })
    it('v-btn' , () =>{
        const wrapper = mount(File)
        expect (wrapper.find('v-btn').exists()).toBeTruthy()
    })
    it('v-simple-table' , () =>{
        const wrapper = mount(File)
        expect (wrapper.find('v-simple-table').exists()).toBeTruthy()
    })
      
})