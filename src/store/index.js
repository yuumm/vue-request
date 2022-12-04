import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// store是vuex中可以用于存储公共状态的
export default new Vuex.Store({
  state: {
  },
  getters: {
    GET_TOKEN:state => {
      return sessionStorage.getItem("token");
    }
  },
  mutations: {
    SET_TOKEN:(state, token) => {
      sessionStorage.setItem("token", token);
    }
  },
  actions: {
  },
  modules: {
  }
})
