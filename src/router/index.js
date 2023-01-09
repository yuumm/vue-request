import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import CenterAllRequest from '../views/requestCenter/CenterAllRequest.vue'
import Register from '../views/Register.vue'
import Details from '../views/details/Details.vue'
import Edit from '../views/details/Edit.vue'
import Create from '../views/details/Create.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向，当访问/的时候，自动跳转到登录页面
  {
    path: '/home',
    name: '首页',
    component: Home,
    children: [
      {
        path: '/index',
        name: '首页',
        component: () => import('../views/index/index'),
      },
      {
        path: '/userCenter',
        name: '个人中心',
        component: () => import('../views/userCenter/index')
      },
    ]
  },
  {
    // path代表用户访问的路径
    path: '/login',
    // component表示当用户访问/login的时候从component获取哪个组建传递到app.vue组件中
    component: Login
  },
  {
    path: '/register',
    component: Register
  },

  // {
  //   path: '/home',
  //   component: Home,
  //   // redirect表示当访问home的时候，就重定向到welcome中
  //   redirect: '/welcome',
    // children 表示如在home路由下的页面中间要显示Welcome路由中的内容
    //  那么就将welcome路由写到home的子路由中，然后在home页面中写入<router-view>，
    //  这样，当我们访问welcome路由的时候，就会在home页面中的<router-view>部分展示welcome的页面
  //   children: [{
  //     path: '/welcome',
  //     component: Welcome,
  //   },
  //   {
  //     path: '/centerAllRequest',
  //     component: CenterAllRequest,
  //   },
  //   {
  //     path: '/details',
  //     component: Details,
  //   },
  //   {
  //     path: '/edit',
  //     component: Edit,
  //   },
  //   {
  //     path: '/create',
  //     component: Create,
  //   }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由守卫，用于判断用户是否登录(下面的代码被同目录下的permission.js平替了，为了方便后面动态路由的实现)
// router.beforeEach((to, from, next) => {
//   // to表示将要访问的路径
//   // from表示从哪个路径跳转而来
//   // next是一个函数表示放行，其中next()表示放行，next("")表示强制跳转到引号内的路径
//   if (to.path == "/login") return next();
//   // 获取localstorage判断是否登录
//   // const storage = localStorage.getItem("userInfo");
//   const storage = window.sessionStorage.getItem("token");
//   if (storage == null) return next("/login");
//   next();
// })

export default router
