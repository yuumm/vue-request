<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/logoCim.png" alt="">
                <span>需求系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 下方主体区域 -->
        <el-container>
            <!-- 左侧边栏 -->
            <!-- 当isCollapse为true的时候边栏宽为64，否则为200 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 侧边栏折叠的按钮 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- collapse-transition表示关闭折叠动画 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse"
                    :collapse-transition="false" router :default-active="activePath">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>需求中心</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="centerAllRequest" @click="saveNavState('centerAllRequest')">所有需求
                            </el-menu-item>
                            <el-menu-item index="centerLeftRequest" @click="saveNavState('centerLeftRequest')">待领取需求
                            </el-menu-item>
                            <el-menu-item index="centerGetRequest" @click="saveNavState('centerGetRequest')">已领取需求
                            </el-menu-item>
                            <el-menu-item index="centerUnfinishRequest" @click="saveNavState('centerUnfinishRequest')">
                                未完成需求</el-menu-item>
                            <el-menu-item index="centerFinishRequest" @click="saveNavState('centerFinishRequest')">已完成需求
                            </el-menu-item>
                        </el-menu-item-group>
                        <!-- 二级菜单 -->
                        <!-- <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="personAllRequest" @click="saveNavState('personAllRequest')">所有需求
                            </el-menu-item>
                            <el-menu-item index="personUnfinishRequest" @click="saveNavState('personUnfinishRequest')">
                                待完成需求
                            </el-menu-item>
                            <el-menu-item index="personFinishRequest" @click="saveNavState('personFinishRequest')">已完成需求
                            </el-menu-item>
                            <el-menu-item index="personSubmitRequest" @click="saveNavState('personSubmitRequest')">提交的需求
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧中心区域 -->
            <el-main>
                <!-- router-view表示路由占位符，例如当访问的welcome路由，那对应页面的内容就会在该部分进行显示 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            // 点击侧边栏折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: ''
        }
    },
    methods: {
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem("activePath");
        },
        logout() {
            // 清空localstorage
            localStorage.removeItem("userInfo");
            this.$router.push("/login");
        },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        // 保存链接的激活状态，主要作用是侧边栏被选中时，对应的地方要高亮
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath);
            this.activePath = window.sessionStorage.getItem("activePath");
        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    height: 100%;
}

// 在elementui中，一个容器的名字就是她的类名
.el-header {
    background-color: #373d41;
    //下两行表示将内容分布在容器两端
    // 以fles方式显示，
    display: flex;
    //space-between表示分布在该容器的两端
    justify-content: space-between;
    // 表示将内部组件上下居中
    align-items: center;
    // 设置文本内容为白色
    color: #fff;
    // 设置文字大小
    font-size: 20px;

    // 下面是对文字的格式设置
    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #eaedf1;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
    // 字符之间的距离
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>