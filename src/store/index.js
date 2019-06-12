/**
 * Created by wangyayun on 17/2/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
  // plugins: [createLogger()]
})