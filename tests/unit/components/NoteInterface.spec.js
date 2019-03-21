import { shallowMount } from '@vue/test-utils'
import NoteInterface from '@/components/NoteInterface'
import state from '@/store/testData/testState.js'
import Board from '@/classes/Board'

const build = options => {
  return shallowMount(NoteInterface, options)
}

let options
let board
beforeEach(() => {
  board = new Board(state.boards['1'])
  options = {
    propsData: {
      board
    }
  }
})

describe('NoteInterface', () => {
  it('renders', () => {
    const wrapper = build(options)
    expect(wrapper.find('.note-interface').exists()).toBe(true)
  })

  it('renders every note in the noteMatrix prop', () => {
    const wrapper = build(options)
    board.getNoteMatrix().forEach((fret, fretIndex) => {
      fret.forEach((note, stringIndex) => {
        expect(wrapper.find({ ref: `note--${fretIndex}-${stringIndex}` }).exists()).toBe(true)
      })
    })
  })

  it('calculates the semitones from root for each note', () => {
    const wrapper = build(options)
    expect(wrapper.vm.semitonesFromRoot).toMatchObject({
      G: 0,
      'G#': 1,
      A: 2,
      'A#': 3,
      B: 4,
      C: 5,
      'C#': 6,
      D: 7,
      'D#': 8,
      E: 9,
      F: 10,
      'F#': 11
    })
  })

  it('recalculates the semitones from root when the board prop is changed', () => {
    board = new Board(state.boards['3'])
    options.propsData = {
      board
    }
    const wrapper = build(options)
    expect(wrapper.vm.semitonesFromRoot).toMatchObject({
      A: 0,
      'A#': 1,
      B: 2,
      C: 3,
      'C#': 4,
      D: 5,
      'D#': 6,
      E: 7,
      F: 8,
      'F#': 9,
      G: 10,
      'G#': 11
    })
  })

  it('emits a "note-click" event when a note is clicked', () => {
    options.propsData.isEditable = true
    const wrapper = build(options)
    const position = { fret: 0, string: 0 }
    wrapper.vm.handleNoteClick(position)

    expect(wrapper.emitted('note-click').length).toBe(1)
    expect(wrapper.emitted('note-click')[0][0]).toBe(position)
  })

  it('does not emit a "note-click" event when isEditable is false', () => {
    const wrapper = build(options)
    const position = { fret: 0, string: 0 }
    wrapper.vm.handleNoteClick(position)

    expect(wrapper.emitted('note-click')).toBeUndefined()
  })

  it("sets Note's isActive prop to true if the note is contained in the positions", () => {
    const wrapper = build(options)
    board.positions.forEach(position => {
      const note = wrapper.find({ ref: `note--${position.fret}-${position.string}` })
      expect(note.props('isActive')).toBe(true)
    })
  })
})
