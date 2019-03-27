import { NOTES } from '@/globals'
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
    this.openTuning = boardState.openTuning
    this.notePreferences = boardState.notePreferences
    this.numFrets = boardState.numFrets
    this.numStrings = boardState.numStrings
    this.startingFret = boardState.startingFret

    // Extra variable for caching purposes
    this.noteMatrix = null
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
      openTuning: this.openTuning,
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
    BoardValidator.validatePosition(searchPosition, this.getBoardState())
    const { fret, string } = searchPosition
    return (
      this.positions.find(position => {
        return position.fret === fret && position.string === string
      }) !== undefined
    )
  }

  /**
   * Gets the note at a given position
   * @param {Position} position - Position object used to find the note
   */
  getNote(position) {
    BoardValidator.validatePosition(position, this.getBoardState())
    const { fret, string } = position
    const baseNote = this.openTuning[string]
    const startIndex = NOTES.indexOf(baseNote)
    return NOTES[(startIndex + fret + this.startingFret) % 12]
  }

  /**
   * Gets the preferred notes in the form of an array
   * @returns {Array} preferredNotes
   */
  getPreferredNotes() {
    return Object.keys(this.notePreferences).map(key => this.notePreferences[key])
  }

  /**
   * Gets a 2D array representing the notes at every position on the fretboard
   * @return {Array}
   */
  getNoteMatrix() {
    if (this.noteMatrix !== null) {
      return this.noteMatrix
    } else {
      let matrix = []
      for (let fret = 0; fret < this.numFrets; fret++) {
        matrix.push([])
        for (let string = 0; string < this.numStrings; string++) {
          matrix[fret].push(this.getNote({ fret, string }))
        }
      }
      return matrix
    }
  }
}

/**
 * @typedef {Object} BoardState
 * @property {String} id - Unique identifier for the fretboard
 * @property {String} name - Name of the fretboard
 * @property {Position[]} positions - Enabled positions of the fretboard
 * @property {String} root - Root note of the fretboard
 * @property {Array} openTuning - Tuning of each note in open position
 * @property {Object} notePreferences - Preferred names of each note in the chromatic scale
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
