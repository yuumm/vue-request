import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入全局样式
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置请求根路径
// axios.defaults.baseURL = 
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  // reder表示根组件是app.vue
  render: h => h(App)
}).$mount('#app')
