import BoardValidator from '@/validation/Board'

/**
 * Class representing a single boardState object with extra getter methods
 * @property {String} this.id - Unique identifier for the fretboard
 * @property {String} this.name - Name of the fretboard
 * @property {Position[]} this.positions - Enabled positions of the fretboard
 * @property {String} this.root - Root note of the fretboard
 * @property {Array} this.openTuning - Tuning of each note in open position
 * @property {String} this.notePreferences - Preferred names of each note in the chromatic scale
 * @property {Number} this.numFrets - Number of frets on this fretboard
 * @property {Number} this.numStrings - Number of strings on this fretboard
 * @property {Number} this.startingFret - Fret number that the board starts at
 */
class Board {
  /**
   * @param {BoardState} boardState - object representing the state of the board
   */
  constructor(boardState) {
    BoardValidator.validateBoard(boardState)
    this.id = boardState.id
    this.name = boardState.name
    this.positions = boardState.positions
    this.root = boardState.root
    this.notePreferences = boardState.notePreferences
    this.numFrets = boardState.numFrets
    this.numStrings = boardState.numStrings
    this.startingFret = boardState.startingFret
  }

  /**
   *
   * @returns {BoardState}
   */
  getBoardState() {
    return {
      id: this.id,
      name: this.name,
      positions: this.positions,
      root: this.root,
      notePreferences: this.notePreferences,
      numFrets: this.numFrets,
      numStrings: this.numStrings,
      startingFret: this.startingFret
    }
  }

  /**
   * Determines if a position is included in a board's state
   * @param {Position} searchPosition - Position object being searched for
   * @returns {boolean}
   */
  includesPosition(searchPosition) {
    const { fret, string } = searchPosition
    return (
      this.positions.find(position => {
        return position.fret === fret && position.string === string
      }) !== undefined
    )
  }
}

/**
 * @typedef {Object} BoardState
 * @property {String} id - Unique identifier for the fretboard
 * @property {String} name - Name of the fretboard
 * @property {Position[]} positions - Enabled positions of the fretboard
 * @property {String} root - Root note of the fretboard
 * @property {Array} openTuning - Tuning of each note in open position
 * @property {String} notePreferences - Preferred names of each note in the chromatic scale
 * @property {Number} numFrets - Number of frets on this fretboard
 * @property {Number} numStrings - Number of strings on this fretboard
 * @property {Number} startingFret - Fret number that the board starts at
 */

/**
 * @typedef {Object} Position
 * @property {Number} fret - Fret position offset from 0
 * @property {Number} string - String position offset from 0
 */

export default Board
