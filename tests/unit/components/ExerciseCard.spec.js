import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import vuetify from 'vuetify'
import ExerciseCard from '@/components/ExerciseCard'
import state from '@/store/testData/testState.js'

Vue.use(vuetify) // temporary until vuetify/createLocalVue bug is resolved

const build = options => {
  return shallowMount(ExerciseCard, options)
}

// Default props
let options
let exercise
beforeEach(() => {
  exercise = state.exercises['1']
  options = {
    propsData: {
      exercise
    }
  }
})

describe('ExerciseCard', () => {
  it('displays the name of the exercise', () => {
    const wrapper = build(options)
    expect(wrapper.find('.exerciseCard__name').text()).toBe(exercise.name)
  })

  it('displays a button to create a description if one does not exist', () => {
    const wrapper = build(options)
    expect(wrapper.find('.exerciseCard__desc').exists()).toBe(false)
    expect(wrapper.find('.exerciseCard__createDesc').exists()).toBe(true)
  })

  it('displays the description of the exercise if exists', () => {
    options.propsData.exercise.description = 'Something'
    const wrapper = build(options)
    expect(wrapper.find('.exerciseCard__desc').exists()).toBe(true)
    expect(wrapper.find('.exerciseCard__createDesc').exists()).toBe(false)
  })
})
