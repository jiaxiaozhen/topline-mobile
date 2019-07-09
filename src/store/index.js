import Vue from 'vue'
import Vuex from 'vuex'
import { setUser, getUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUser()
  },
  mutations: {
    setToken (state, user) {
      state.user = user
      // 加入本地存储中
      setUser(state.user)
    }
  },
  actions: {

  }
})
