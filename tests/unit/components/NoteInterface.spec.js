import { shallowMount } from '@vue/test-utils'
import NoteInterface from '@/components/NoteInterface'
import state from '@/store/testData/testState.js'
import getters from '@/store/getters'

const getBoardNoteMatrix = getters.getBoardNoteMatrix(state, {
  getNoteAtPosition: getters.getNoteAtPosition(state)
})

const build = options => {
  return shallowMount(NoteInterface, options)
}
// test that semitonesFromRoot() responds when root note is changed
// Default props
let options
beforeEach(() => {
  const board = state.boards['1']
  options = {
    propsData: {
      noteMatrix: getBoardNoteMatrix('1'),
      notePreferences: board.notePreferences,
      root: board.root
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
    options.propsData.noteMatrix.forEach((fret, fretIndex) => {
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

  it('recalculates the semitones from root when the root prop is changed', () => {
    const wrapper = build(options)
    wrapper.setProps({
      root: 'A'
    })
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
})
