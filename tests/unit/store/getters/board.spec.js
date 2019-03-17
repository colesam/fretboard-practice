import state from '@/store/testData/testState.js'
import getters from '@/store/getters.js'

let { getBoardList } = getters

// Need to get functions returned from parameterized getters
const getNoteAtPosition = getters.getNoteAtPosition(state)
const getBoardNoteMatrix = getters.getBoardNoteMatrix(state, { getNoteAtPosition })

// Main testing board
const board = state.boards['1']

describe('getBoardList', () => {
  it('returns an array of all boards in the vuex store', () => {
    const result = getBoardList(state)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toMatchSnapshot()
  })
})

describe('getBoardNoteMatrix', () => {
  it('returns a matrix of every note at every position on the fretboard', () => {
    expect(getBoardNoteMatrix('2')).toMatchSnapshot()
    expect(getBoardNoteMatrix('3')).toMatchSnapshot()
  })
})
