import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    permissionBtn:['home:add','home:delete','home:edit']
  },
  getters: {
    permissionList(state){
      return state.permissionBtn
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
