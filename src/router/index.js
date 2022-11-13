import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向，当访问/的时候，自动跳转到登录页面
  {
    path: '/',
    redirect: '/login',
  },
  {
    // path代表用户访问的路径
    path: '/login',
    // component表示当用户访问/login的时候从component获取哪个组建传递到app.vue组件中
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
