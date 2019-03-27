import shortid from 'shortid'
import BoardValidation from '@/validation/Board.js'

/**
 * Methods that perform validation and service interactions before mutations
 * @namespace Vuex.Actions
 */
export default {
  /**
   * Insert a new board into the store
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {BoardState} board - New BoardData
   */
  insertBoard({ commit, state }, board) {
    if (board.id == null) {
      board.id = shortid.generate()
    } else if (state.boards[board.id] != null) {
      throw 'IllegalArgument - board already exists'
    }

    BoardValidation.validateBoard(board)
    commit('setBoard', board)
  },

  /**
   * Updates a board in the store
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {BoardState} board
   */
  setBoard({ commit }, board) {
    BoardValidation.validateBoard(board)
    commit('setBoard', board)
  }
}
