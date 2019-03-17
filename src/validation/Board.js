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
    let startingFret = ow.number.greaterThanOrEqual(0)

    // Add additional validation rules that depend on board data
    if (board != null) {
      position = position.exactShape({
        fret: ow.number.inRange(0, board.numFrets),
        string: ow.number.inRange(0, board.numStrings - 1)
      })
      openTuning = openTuning.length(board.numStrings)
      startingFret = startingFret.lessThan(board.numFrets)
    }

    return {
      id: ow.number.greaterThan(0),
      name: ow.string.nonEmpty,
      positions: ow.array.ofType(position),
      root: note,
      notePreferences: ow.object.hasKeys(...NOTES),
      numFrets: ow.number.greaterThanOrEqual(0),
      numStrings: ow.number.greaterThanOrEqual(0),
      openTuning,
      startingFret,
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
      numStrings,
      startingFret
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
        numStrings,
        startingFret
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
