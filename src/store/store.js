import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Test State
import testState from '@/store/testData/testState.js'

import getters from '@/store/getters.js'
import mutations from '@/store/mutations.js'
import actions from '@/store/actions.js'

/**
 * @namespace Vuex
 */
export default new Vuex.Store({
  state: testState,

  getters,
  mutations,
  actions
})
