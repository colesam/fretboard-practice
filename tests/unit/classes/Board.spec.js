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

describe('getNote', () => {
  it('returns the correct note at the passed position', () => {
    expect(board.getNote({ fret: 0, string: 0 })).toBe('E')
    expect(board.getNote({ fret: 19, string: 3 })).toBe('D')
    expect(board.getNote({ fret: 3, string: 2 })).toBe('F')
    expect(board.getNote({ fret: 4, string: 2 })).toBe('F#')
  })

  it('returns the correct note on boards with a startIndex greater than 0', () => {
    board = new Board(state.boards['3'])
    expect(board.getNote({ fret: 0, string: 0 })).toBe('B')
    expect(board.getNote({ fret: 1, string: 1 })).toBe('F')
    expect(board.getNote({ fret: 2, string: 2 })).toBe('B')
    expect(board.getNote({ fret: 3, string: 3 })).toBe('F')
  })
})
