import { createStore } from 'vuex'
import VuexNow from 'vuex-now'

const now = VuexNow(1000)

export default createStore({
  state: {
    isAdmin: false,
  },
  getters: {
  },
  mutations: {
    ADMIN_POWER(state){
      state.isAdmin=true;
    },
    ADMIN_STOP(state){
      state.isAdmin=false;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [now],
})
