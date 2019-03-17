import { shallowMount } from '@vue/test-utils'
import Fretboard from '@/components/Fretboard'
import NoteInterface from '@/components/NoteInterface'
import state from '@/store/testData/testState.js'
import Board from '@/classes/Board'

const build = options => {
  return shallowMount(Fretboard, options)
}

// Default props
let options
beforeEach(() => {
  const board = state.boards['1']
  options = {
    propsData: {
      board: new Board(board)
    }
  }
})

describe('Fretboard', () => {
  it('renders', () => {
    const wrapper = build(options)
    expect(wrapper.find('.fretboard-wrapper').exists()).toBe(true)
  })

  it('renders a visual fret for every fret in the noteMatrix prop', () => {
    const board = new Board(state.boards['3'])
    const noteMatrix = board.getNoteMatrix()
    options.propsData = {
      board
    }
    const wrapper = build(options)
    expect(wrapper.findAll('.fretboard__fret').length).toBe(noteMatrix.length)
  })

  it('renders a nut only if the starting fret is 0', () => {
    let wrapper = build(options)
    expect(wrapper.find('.fretboard__nut').exists()).toBe(true)

    let board = new Board(state.boards['1'])
    board.startingFret = 1
    wrapper.setProps({
      board
    })
    expect(wrapper.find('.fretboard__nut').exists()).toBe(false)
  })

  it('includes the nut as a fret if the starting fret is 0', () => {
    options.startingFret = 0
    const wrapper = build(options)
    const { board } = options.propsData
    expect(wrapper.findAll('.fretboard__fret').length + 1).toBe(board.getNoteMatrix().length)
  })

  it('renders a noteInterface child component', () => {
    const wrapper = build(options)
    expect(wrapper.find(NoteInterface).exists()).toBe(true)
  })

  it('emits a "note-click" event on its noteInterface\'s "note-click" event', () => {
    options.propsData.isEditable = true
    const wrapper = build(options)
    const position = { fret: 0, note: 0 }
    wrapper.vm.handleNoteClick(position)
    expect(wrapper.emitted('note-click').length).toBe(1)
    expect(wrapper.emitted('note-click')[0][0]).toMatchObject(position)
  })

  it('does not emit a "note-click" event if the isEditable prop is false', () => {
    options.propsData.isEditable = false
    const wrapper = build(options)
    const position = { fret: 0, note: 0 }
    wrapper.vm.handleNoteClick(position)
    expect(wrapper.emitted('note-click')).toBeUndefined()
  })
})
