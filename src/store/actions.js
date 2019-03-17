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
    commit('insertBoard', board)
  },

  /**
   * Set the name property of a board
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {Object} params
   * @param {Number} params.boardId - Board id of board to change
   * @param {String} params.name - New name of the board
   */
  setBoardName({ commit }, params) {
    BoardValidation.validateName(params.name)
    commit('setBoardName', params)
  },

  /**
   * Set the root property of a board
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.name - New root of the board
   */
  setBoardRoot({ commit }, params) {
    BoardValidation.validateName(params.root)
    commit('setBoardRoot', params)
  },

  /**
   * Insert a position into a board
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.name - Position to be inserted
   */
  insertBoardPosition({ commit, state }, params) {
    const board = state.boards[params.boardId]
    BoardValidation.validatePosition(params.position, board)
    commit('insertBoardPosition', params)
  },

  /**
   * Remove a position from a board
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.name - Position to be removed
   */
  removeBoardPosition({ commit, state }, params) {
    const board = state.boards[params.boardId]
    BoardValidation.validatePosition(params.position, board)
    commit('removeBoardPosition', params)
  },

  /**
   * Toggle whether a position in a board is active
   * @memberof Vuex.Actions
   * @param {Object} context - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.position - Position to toggle
   */
  togglePosition({ commit, getters, state }, params) {
    BoardValidation.validatePosition(params.position, state.boards[params.boardId])

    if (getters.boardIncludesPosition(params.boardId, params.position)) {
      commit('removePosition', params)
    } else {
      commit('insertPosition', params)
    }
  }
}
