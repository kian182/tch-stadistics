import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogged: !!localStorage.getItem('token')
}

const mutations = {
  LOGIN_USER(state) {
    state.isLogged = true
  },

  LOGOUT_USER(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('usr')
    localStorage.removeItem('buildNumber')
    state.isLogged = false
    router.push('login')
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations
})
