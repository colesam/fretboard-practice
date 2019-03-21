// noinspection JSCommentMatchesSignature
/**
 * Methods that use logic to return complex data from the vuex store
 * @namespace Vuex.Getters
 */
export default {
  /**
   * Gets a list of all available boards
   * @memberof Vuex.Getters
   * @param {Object} state
   */
  getBoardList: state => Object.keys(state.boards).map(id => state.boards[id])
}
