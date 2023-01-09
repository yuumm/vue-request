import router from '@/router/index'
import store from '@/store/index'
import menu from "element-ui/packages/menu";

// 挂载路由守卫，用于判断用户是否登录
router.beforeEach((to, from, next) => {
    // 后面要通过token判断用户是否登录，以判断是否需要跳转到login页面
    // let token = store.getters.GET_TOKEN

    // to表示将要访问的路径
    // from表示从哪个路径跳转而来
    // next是一个函数表示放行，其中next()表示放行，next("")表示强制跳转到引号内的路径

    // if (to.path == "/login") return next();

    // 获取localstorage判断是否登录
    // const storage = localStorage.getItem("userInfo");

    // const storage = window.sessionStorage.getItem("token");
    // if (storage == null) return next("/login");
    // next();

    const whiteList = ['/login'];

    // 首先从storage中获取token
    let token = store.getters.GET_TOKEN;
    console.log("router permission: " + token);
    let hasRoute = store.state.hasRoutes;
    console.log("hasRouter permission: " + hasRoute);
    let menuList = store.getters.GET_MENULIST;
    console.log("menuList permission: " + menuList);

    // 当存在token的时候则放行
    if (token) {
        if (!hasRoute) {
            // 绑定route
            bindRoute(menuList);
            // 提交hasRoute更改，将其改为true
            store.commit("SET_ROUTES_STATE", true);
        }
        next();
    } else {
        // 如果当前路径是whiteList中的，则放行，否则跳转到登录页面
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }

})

// 动态绑定路由
const bindRoute=(menuList) => {
    // 后面会通过newRoutes设置路由信息
    let newRoutes = router.options.routes;
    // 遍历menuList，每次获取出一个menu
    menuList.forEach(menu => {
        // 主要是获取子菜单中的name, component, path四个字段，因为页面只会在子菜单中有
        // 其中children是在后端就已经设置好了，不需要做其他的东西
        if (menu.children) {
            // 遍历所有的children
            menu.children.forEach(m => {
                // 将菜单对象转换为路由对象
                let route = menuToRoutes(m, menu.name);
                if (route) {
                    // 将获取到的路由对象放进newRoute数组中
                    newRoutes[0].children.push(route);
                }
            })
        }
    })
    // 将newRoute中的数据重新分配到路由管理中
    newRoutes.forEach(route => {
        router.addRoute(route);
    })
}

// 该方法将菜单对象转成了路由对象
const menuToRoutes=(menu, parentName) => {
    // 首先判断是否有component，如果有才转换，没有的话直接返回
    if (!menu.component) {
        return null;
    } else {
        // 创建route
        let route = {
            name: menu.name,
            path: menu.path,
            // 创建原数据
            meta: {
                parentName: parentName
            }
        }
        // 写入要路由到的对应的组件
        // 这里就相当于在router的index文件中写路由的router一样
        route.component=()=>import('@/views/'+menu.component+'.vue');
        return route;
    }
}