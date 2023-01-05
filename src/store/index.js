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
    },
    GET_MENULIST:state => {
      return JSON.parse(sessionStorage.getItem("menuList"));
    }
  },
  mutations: {
    SET_TOKEN:(state, token) => {
      sessionStorage.setItem("token", token);
    },
    SET_MENULIST:(state, menuList) => {
      // 这里需要将对象转换为json串
      sessionStorage.setItem("menuList", JSON.stringify(menuList));
    }
  },
  actions: {
  },
  modules: {
  }
})
