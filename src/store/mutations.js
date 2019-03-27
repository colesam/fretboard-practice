/**
 * Methods that directly mutate vuex store state
 * @namespace Vuex.Mutations
 */
export default {
  // BOARD MUTATIONS
  /**
   * Updates a boards state in the store
   * @memberof Vuex.Mutations
   * @param {Object} state
   * @param {BoardState} board
   */
  setBoard(state, board) {
    state.boards[board.id] = board
  }
}
