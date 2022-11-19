import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

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
  },
  {
    path: '/home',
    component: Home,
    // redirect表示当访问home的时候，就重定向到welcome中
    redirect: '/welcome',
    // children 表示在home路由下的页面中间要显示Welcome路由中的内容
    // 例如在侧边栏的旁边显示不同的内容，就可以将要显示的内容写到子路径中，然后可以显示
    children: [{
      path: '/welcome',
      component: Welcome,
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由守卫，用于判断用户是否登录
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径
  // from表示从哪个路径跳转而来
  // next是一个函数表示放行，其中next()表示放行，next("")表示强制跳转到引号内的路径
  if (to.path == "/login") return next();
  // 获取localstorage判断是否登录
  const storage = localStorage.getItem("userInfo");
  if (storage == null) return next("/login");
  next();
})

export default router
