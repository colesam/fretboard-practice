import initialState from '@/store/testData/testState.js'
import mutations from '@/store/mutations.js'

const { insertBoard, setBoard } = mutations

let state
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState))
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
      numStrings: 2,
      startingFret: 0
    }

    insertBoard(state, newBoard)

    expect(state.boards[newBoard.id]).toMatchObject(newBoard)
  })
})

describe('setBoard', () => {
  it('updates state.boards at board.id', () => {})
})
