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
  }
}
