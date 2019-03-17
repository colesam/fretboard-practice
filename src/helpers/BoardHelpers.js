const BoardHelpers = {
  /**
   * Determines if a position is included in a board's state
   * @param {BoardState} board - Board to search through for matching position
   * @param {Position} position - Position object being searched for
   * @returns {boolean}
   */
  boardIncludesPosition(board, position) {
    const { fret, string } = position
    return (
      board.positions.find(position => {
        return position.fret === fret && position.string === string
      }) !== undefined
    )
  }
}

export default BoardHelpers
