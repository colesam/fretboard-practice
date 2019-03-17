const BoardHelpers = {
  /**
   * Determines if a position is included in a board's state
   * @param {Position[]} positions - Array of positions from the board
   * @param {Position} searchPosition - Position object being searched for
   * @returns {boolean}
   */
  boardIncludesPosition(positions, searchPosition) {
    const { fret, string } = searchPosition
    return (
      positions.find(position => {
        return position.fret === fret && position.string === string
      }) !== undefined
    )
  }
}

export default BoardHelpers
