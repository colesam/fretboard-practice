import { describe, it, expect, beforeEach } from '@/plugins/jest' // useful for IDE's
import initialState from '@/store/testData/testState.js'
import actions from '@/store/actions.js'

const { insertBoard, setBoard } = actions

let state
let testBoard
let mockCommit
let mockCalls
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState))
  testBoard = state.boards['1']
  mockCommit = jest.fn()
  mockCalls = mockCommit.mock.calls
})

describe('insertBoard', () => {
  let context
  beforeEach(() => {
    delete testBoard.id
    context = {
      commit: mockCommit,
      state
    }
  })

  it('commits the insertBoard mutation', () => {
    insertBoard(context, testBoard)
    expect(mockCalls[0][0]).toBe('setBoard')
    expect(mockCalls[0][1]).toBe(testBoard)
  })

  it('assigns a unique id to the board', () => {
    expect(testBoard.id).toBeUndefined()
    insertBoard(context, testBoard)
    expect(mockCalls[0][1].id).not.toBeUndefined()
  })
})

describe('setBoard', () => {
  beforeEach(() => {
    testBoard.name = 'New Name'
  })

  it('commits the setBoard mutation', () => {
    const context = {
      commit: mockCommit,
      state
    }
    setBoard(context, testBoard)
    expect(mockCalls[0][0]).toBe('setBoard')
    expect(mockCalls[0][1]).toBe(testBoard)
  })
})
