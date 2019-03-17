import { describe, it, expect, beforeEach } from '@/plugins/jest' // useful for IDE's
import initialState from '@/store/testData/testState.js'
import getters from '@/store/getters.js'
import actions from '@/store/actions.js'

const {
  insertBoard,
  togglePosition,
  setBoardName,
  setBoardRoot,
  insertBoardPosition,
  removeBoardPosition
} = actions

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

describe('setBoardName', () => {
  it('commits the setBoardName mutation', () => {
    params.name = 'New Board Name'
    setBoardName({ commit: mockCommit }, params)
    expect(mockCalls[0][0]).toBe('setBoardName')
    expect(mockCalls[0][1]).toBe(params)
  })
})

describe('setBoardRoot', () => {
  it('commits the setBoardRoot mutation', () => {
    params.root = 'A#'
    setBoardRoot({ commit: mockCommit }, params)
    expect(mockCalls[0][0]).toBe('setBoardRoot')
    expect(mockCalls[0][1]).toMatchObject(params)
  })
})

describe('insertBoardPosition', () => {
  it('commits the insertBoardPosition mutation', () => {
    const context = {
      commit: mockCommit,
      state
    }
    params.position = { fret: 1, string: 0 }

    insertBoardPosition(context, params)
    expect(mockCalls[0][0]).toBe('insertBoardPosition')
    expect(mockCalls[0][1]).toMatchObject(params)
  })
})

describe('removeBoardPosition', () => {
  it('commits the removeBoardPosition mutation', () => {
    const context = {
      commit: mockCommit,
      state
    }
    params.position = { fret: 0, string: 0 }

    removeBoardPosition(context, params)
    expect(mockCalls[0][0]).toBe('removeBoardPosition')
    expect(mockCalls[0][1]).toMatchObject(params)
  })
})

describe('togglePosition', () => {
  it('commits the removePosition mutation if the position already exists in the board', () => {
    const context = {
      commit: mockCommit,
      getters: { boardIncludesPosition: getters.boardIncludesPosition(state) },
      state
    }
    params.position = { fret: 0, string: 3 }

    togglePosition(context, params)

    expect(mockCommit.mock.calls.length).toBe(1)
    expect(mockCommit.mock.calls[0][0]).toBe('removePosition')
    expect(mockCommit.mock.calls[0][1]).toMatchObject(params)
  })

  it('commits the insertPosition mutation if the position does not exist in the board', () => {
    const context = {
      commit: mockCommit,
      getters: { boardIncludesPosition: getters.boardIncludesPosition(state) },
      state
    }
    params.position = { fret: 0, string: 0 }

    togglePosition(context, params)

    expect(mockCommit.mock.calls.length).toBe(1)
    expect(mockCommit.mock.calls[0][0]).toBe('insertPosition')
    expect(mockCommit.mock.calls[0][1]).toMatchObject(params)
  })
})
