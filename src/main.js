import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入全局样式
import './assets/css/global.css'
import  qs from 'qs'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置请求根路径
// axios.defaults.baseURL =
// 设置请求拦截器，request表示请求拦截器，use表示挂载请求函数
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = localStorage.getItem("userinfo")
  // 最后必须return config，否则会报错
  return config;
})
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


new Vue({
  router,
  store,
  // reder表示根组件是app.vue
  render: h => h(App)
}).$mount('#app')
