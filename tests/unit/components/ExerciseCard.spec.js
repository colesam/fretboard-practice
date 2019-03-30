import { shallowMount } from '@vue/test-utils'
import ExerciseCard from '@/components/ExerciseCard'
import state from '@/store/testData/testState.js'

const build = options => {
  return shallowMount(ExerciseCard, options)
}

// Default props
let options
beforeEach(() => {
  options = {
    propsData: {
      exercise: state.exercises['1']
    }
  }
})

describe('ExerciseCard', () => {
  it('displays the name of the exercise', () => {
    expect(false).toBe(true)
  })

  it('displays the description of the exercise if exists', () => {
    expect(false).toBe(true)
  })

  it('displays a button to create a description if one does not exist', () => {
    expect(false).toBe(true)
  })
})
