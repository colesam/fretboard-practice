import { shallowMount } from '@vue/test-utils'
import Note from '@/components/Note'

const build = options => {
  return shallowMount(Note, options)
}

// Default props
let options
beforeEach(() => {
  options = {
    propsData: {
      content: 'A#'
    }
  }
})

describe('Note', () => {
  it('renders', () => {
    const wrapper = build(options)
    expect(wrapper.contains('.note')).toBe(true)
  })

  it('renders the content prop', () => {
    const wrapper = build(options)
    expect(wrapper.find('.note div').text()).toBe(options.propsData.content)
  })

  it("adds the note's class attribute to the noteClass prop", () => {
    options.propsData.noteClass = 'test'
    const wrapper = build(options)
    expect(wrapper.find('.test').exists()).toBe(true)
  })

  it('adds the "active" class only when the isActive prop is true', () => {
    options.propsData.isActive = false
    let wrapper = build(options)
    expect(wrapper.find('.active').exists()).toBe(false)

    options.propsData.isActive = true
    wrapper = build(options)
    expect(wrapper.find('.active').exists()).toBe(true)
  })

  it('adds the "note--hover" class on mouseover only when the isHoverable prop is true', () => {
    options.propsData.isHoverable = false
    let wrapper = build(options)
    wrapper.trigger('mouseover')
    expect(wrapper.find('.note--hover').exists()).toBe(false)

    options.propsData.isHoverable = true
    wrapper = build(options)
    wrapper.trigger('mouseover')
    expect(wrapper.find('.note--hover').exists()).toBe(true)
  })
})
