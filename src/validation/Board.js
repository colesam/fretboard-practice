import { NOTES } from '@/globals'
import ow from 'ow'

/**
 * @namespace Validation
 */

/**
 * Validation module for BoardState objects and properties
 * @namespace Validation.Board
 */
export default {
  /**
   * Returns an object of predicates that validate each property of a BoardState object
   * @memberof Validation.Board
   * @param {BoardState} board
   */
  predicates(board) {
    let position = ow.object
    let openTuning = ow.array.ofType(ow.string.oneOf(NOTES))
    let note = ow.string.oneOf(NOTES)

    // Add additional validation rules that depend on board data
    if (board != null) {
      position = position.exactShape({
        fret: ow.number.inRange(0, board.numFrets),
        string: ow.number.inRange(0, board.numStrings - 1)
      })
      openTuning = openTuning.length(board.numStrings)
    }

    return {
      id: ow.string.nonEmpty,
      name: ow.string.nonEmpty,
      positions: ow.array.ofType(position),
      root: note,
      notePreferences: ow.object.hasKeys(...NOTES),
      numFrets: ow.number.greaterThanOrEqual(0),
      numStrings: ow.number.greaterThanOrEqual(0),
      openTuning,
      note,
      position
    }
  },

  /**
   * Throws ArgumentError if board data is invalid
   * @memberof Validation.Board
   * @param {BoardState} board - Board data to validate
   */
  validateBoard(board) {
    const {
      id,
      name,
      positions,
      root,
      openTuning,
      notePreferences,
      numFrets,
      numStrings
    } = this.predicates(board)

    ow(
      board,
      ow.object.exactShape({
        id,
        name,
        positions,
        root,
        openTuning,
        notePreferences,
        numFrets,
        numStrings
      })
    )
  },

  /**
   * Throws ArgumentError if board name is invalid
   * @memberof Validation.Board
   * @param {string} name - Board name to validate
   */
  validateName(name) {
    ow(name, this.predicates().name)
  },

  /**
   * Throws ArgumentError if note is invalid
   * @memberof Validation.Board
   * @param {string} note
   */
  validateNote(note) {
    ow(note, this.predicates().note)
  },

  /**
   * Throws ArgumentError if position is invalid
   * @memberof Validation.Board
   * @param {Position} position - Position object to validate
   * @param {BoardState} board - Board data used to determine validity
   */
  validatePosition(position, board) {
    ow(position, this.predicates(board).position)
  }
}

// Related Type Definitions
/**
 * @typedef {Object} BoardState
 * @property {string} id - Unique identifier for the fretboard
 * @property {string} name - Name of the fretboard
 * @property {Position[]} positions - Enabled positions of the fretboard
 * @property {string} root - Root note of the fretboard
 * @property {Array} openTuning - Tuning of each note in open position
 * @property {string} notePreferences - Preferred names of each note in the chromatic scale
 * @property {string} numFrets - Number of frets on this fretboard
 * @property {string} numStrings - Number of strings on this fretboard
 */

/**
 * @typedef {Object} Position
 * @property {number} fret - Fret position offset from 0
 * @property {number} string - String position offset from 0
 */
