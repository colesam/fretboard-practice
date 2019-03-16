import { describe, it, expect } from '@/plugins/jest' // useful for IDE's

import state from '@/store/testData/testState.js'
import getters from '@/store/getters.js'

let { getBoardList } = getters

// Need to get functions returned from parameterized getters
const boardIncludesPosition = getters.boardIncludesPosition(state)
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

describe('boardIncludesPosition', () => {
  it('returns true if the position is included in the board', () => {
    expect(boardIncludesPosition(board.id, { fret: 3, string: 0 })).toBe(true)
  })

  it('returns false if the position is not included in the board', () => {
    expect(boardIncludesPosition(board.id, { fret: 19, string: 3 })).toBe(false)
  })
})

describe('getNoteAtPosition', () => {
  it('returns the correct note at the passed position', () => {
    const { id } = board
    expect(getNoteAtPosition(id, { fret: 0, string: 0 })).toBe('E')
    expect(getNoteAtPosition(id, { fret: 19, string: 3 })).toBe('D')
    expect(getNoteAtPosition(id, { fret: 3, string: 2 })).toBe('F')
    expect(getNoteAtPosition(id, { fret: 4, string: 2 })).toBe('F#')
  })

  it('returns the correct note on boards with a startIndex greater than 0', () => {
    const id = '3'
    expect(getNoteAtPosition(id, { fret: 0, string: 0 })).toBe('B')
    expect(getNoteAtPosition(id, { fret: 1, string: 1 })).toBe('F')
    expect(getNoteAtPosition(id, { fret: 2, string: 2 })).toBe('B')
    expect(getNoteAtPosition(id, { fret: 3, string: 3 })).toBe('F')
  })
})

describe('getBoardNoteMatrix', () => {
  it('returns a matrix of every note at every position on the fretboard', () => {
    expect(getBoardNoteMatrix('2')).toMatchSnapshot()
    expect(getBoardNoteMatrix('3')).toMatchSnapshot()
  })
})
