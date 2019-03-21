import state from '@/store/testData/testState.js'
import getters from '@/store/getters.js'

let { getBoardList } = getters

describe('getBoardList', () => {
  it('returns an array of all boards in the vuex store', () => {
    const result = getBoardList(state)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toMatchSnapshot()
  })
})
