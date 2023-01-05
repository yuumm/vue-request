import router from '@/router/index'
import store from '@/store/index'

// 挂载路由守卫，用于判断用户是否登录
router.beforeEach((to, from, next) => {
    // 后面要通过token判断用户是否登录，以判断是否需要跳转到login页面
    // let token = store.getters.GET_TOKEN

    // to表示将要访问的路径
    // from表示从哪个路径跳转而来
    // next是一个函数表示放行，其中next()表示放行，next("")表示强制跳转到引号内的路径
    if (to.path == "/login") return next();
    // 获取localstorage判断是否登录
    // const storage = localStorage.getItem("userInfo");
    const storage = window.sessionStorage.getItem("token");
    if (storage == null) return next("/login");
    next();
})