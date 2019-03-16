/**
 * Methods that directly mutate vuex store state
 * @namespace Vuex.Mutations
 */
export default {
  // BOARD MUTATIONS
  /**
   * Inserts a board into the store
   * @memberof Vuex.Mutations
   * @param {Object} state
   * @param {BoardState} board
   */
  insertBoard(state, board) {
    state.boards[board.id] = board
  },

  /**
   * Sets the name property of a board
   * @memberof Vuex.Mutations
   * @param {Object} state - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.position - Position to toggle
   */
  setBoardName(state, params) {
    state.boards[params.boardId].name = params.name
  },

  /**
   * Sets the root property of a board
   * @memberof Vuex.Mutations
   * @param {Object} state - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.position - Position to toggle
   */
  setBoardRoot(state, params) {
    state.boards[params.boardId].root = params.root
  },

  /**
   * Pushes a position onto a board's positions property
   * @memberof Vuex.Mutations
   * @param {Object} state - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.position - Position to toggle
   */
  insertBoardPosition(state, params) {
    state.boards[params.boardId].positions.push(params.position)
  },

  /**
   * Removes a position from a board's positions property
   * @memberof Vuex.Mutations
   * @param {Object} state - Automatically added by a live store
   * @param {Object} params
   * @param {number} params.boardId - Board id of board to change
   * @param {Position} params.position - Position to toggle
   */
  removeBoardPosition(state, params) {
    const board = state.boards[params.boardId]
    const { fret, string } = params.position

    const index = board.positions.findIndex(position => {
      return position.fret === fret && position.string === string
    })

    board.positions.splice(index, 1)
  }
}
