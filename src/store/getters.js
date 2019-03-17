import { NOTES } from '@/globals'
import Board from '@/validation/Board.js'
import Board from '@/classes/Board'

// noinspection JSCommentMatchesSignature
/**
 * Methods that use logic to return complex data from the vuex store
 * @namespace Vuex.Getters
 */
export default {
  // BOARD GETTERS
  /**
   * Gets a list of all available boards
   * @memberof Vuex.Getters
   * @param {Object} state
   */
  getBoardList(state) {
    return Object.keys(state.boards).map(id => state.boards[id])
  },

  /**
   * Gets the note at a given position
   * @memberof Vuex.Getters
   * @param {number} boardId - Unique identifier of the board
   * @param {Position} position - Position object used to find the note
   */
  getNoteAtPosition: state => (boardId, position) => {
    const board = state.boards[boardId]
    const { fret, string } = position
    const startingFret = board.startingFret != null ? board.startingFret : 0

    Board.validatePosition(position, board)

    const baseNote = board.openTuning[string]
    const startIndex = NOTES.indexOf(baseNote)

    return NOTES[(startIndex + fret + startingFret) % 12]
  },

  /**
   * Gets a 2D array representing the notes at every position on the fretboard
   * @memberof Vuex.Getters
   * @param {number} boardId - Unique identifier of the board
   */
  getBoardNoteMatrix: (state, getters) => boardId => {
    const board = state.boards[boardId]
    let matrix = []

    // For each position on the board...
    for (let fret = 0; fret < board.numFrets; fret++) {
      matrix.push([])
      for (let string = 0; string < board.numStrings; string++) {
        // Push note (NOTES) into note matrix
        matrix[fret].push(getters.getNoteAtPosition(board.id, { fret, string }))
      }
    }

    return matrix
  }
}
