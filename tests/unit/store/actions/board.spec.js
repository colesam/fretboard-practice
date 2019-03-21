import { describe, it, expect, beforeEach } from '@/plugins/jest' // useful for IDE's
import initialState from '@/store/testData/testState.js'
import getters from '@/store/getters.js'
import actions from '@/store/actions.js'

const { insertBoard } = actions

let state
let params
let mockCommit
let mockCalls
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState))
  params = {
    boardId: '1'
  }
  mockCommit = jest.fn()
  mockCalls = mockCommit.mock.calls
})

describe('insertBoard', () => {
  let newBoard
  let context
  beforeEach(() => {
    newBoard = {
      name: 'Test Insert',
      positions: [],
      root: 'A',
      openTuning: ['A', 'A'],
      notePreferences: {
        A: 'A',
        'A#': 'B♭',
        B: 'B',
        C: 'C',
        'C#': 'C#',
        D: 'D',
        'D#': 'E♭',
        E: 'E',
        F: 'F',
        'F#': 'F#',
        G: 'G',
        'G#': 'A♭'
      },
      numFrets: 2,
      numStrings: 2,
      startingFret: 0
    }
    context = {
      commit: mockCommit,
      state
    }
  })

  it('commits the insertBoard mutation', () => {
    const context = {
      commit: mockCommit,
      state
    }
    insertBoard(context, newBoard)
    expect(mockCalls[0][0]).toBe('insertBoard')
    expect(mockCalls[0][1]).toBe(newBoard)
  })

  it('assigns a unique id to the board', () => {
    expect(newBoard.id).toBeUndefined()
    insertBoard(context, newBoard)
    expect(mockCalls[0][1].id).not.toBeUndefined()
  })
})
