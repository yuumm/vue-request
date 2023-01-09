import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// store是vuex中可以用于存储公共状态的
export default new Vuex.Store({
  state: {
    // 下面是一个标识作用，主要是左侧菜单栏的访问路径，只需要访问一次，减少消耗。
    hasRoutes: false,
    editableTabsValue: '/index'
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
    },
    SET_ROUTES_STATE:(state, hasRoutes) => {
      state.hasRoutes = hasRoutes;
    }
  },
  actions: {
  },
  modules: {
  }
})
