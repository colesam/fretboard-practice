import { describe, it, expect, beforeEach } from '@/plugins/jest' // useful for IDE's
import initialState from '@/store/testData/testState.js'
import mutations from '@/store/mutations.js'
import getters from '@/store/getters.js'

const {
  insertBoard,
  setBoardName,
  setBoardRoot,
  insertBoardPosition,
  removeBoardPosition
} = mutations

let state
let params
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState))
  params = {
    boardId: '1'
  }
})

describe('insertBoard', () => {
  it('inserts a board into state.boards at board.id', () => {
    const newBoard = {
      id: 'test123',
      name: 'Test Board',
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
      numStrings: 2
    }

    insertBoard(state, newBoard)

    expect(state.boards[newBoard.id]).toMatchObject(newBoard)
  })
})

describe('setBoardName', () => {
  it("sets a board's name to the value of params.name", () => {
    params.name = 'Test Name 123'
    setBoardName(state, params)

    expect(state.boards[params.boardId].name).toBe(params.name)
  })
})

describe('setBoardRoot', () => {
  it("sets a board's root to the value of params.root", () => {
    params.root = 'F#'
    setBoardRoot(state, params)

    expect(state.boards[params.boardId].root).toBe(params.root)
  })
})

describe('insertBoardPosition', () => {
  it("inserts params.position to the board's positions", () => {
    const boardIncludesPosition = getters.boardIncludesPosition(state)
    params.position = { fret: 1, string: 3 }
    insertBoardPosition(state, params)

    expect(boardIncludesPosition(params.boardId, params.position)).toBe(true)
  })
})

describe('removeBoardPosition', () => {
  it("removes params.position from the board's positions", () => {
    const boardIncludesPosition = getters.boardIncludesPosition(state)
    params.position = { fret: 0, string: 3 }
    removeBoardPosition(state, params)

    expect(boardIncludesPosition(params.boardId, params.position)).toBe(false)
  })
})
