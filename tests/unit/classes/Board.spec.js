import state from '@/store/testData/testState'
import Board from '@/classes/Board'

let board
beforeEach(() => {
  board = new Board(state.boards['1'])
})

describe('includesPosition', () => {
  it('returns true if the position is included in the board', () => {
    expect(board.includesPosition({ fret: 3, string: 0 })).toBe(true)
  })

  it('returns false if the position is not included in the board', () => {
    expect(board.includesPosition({ fret: 19, string: 3 })).toBe(false)
  })
})
