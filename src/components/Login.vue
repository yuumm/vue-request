<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像设置区 -->
            <div class="avator_box">
                <img src="../assets/logo.png">
            </div>
            <!-- 登录表单区域 -->
            <!-- label-width="0px"表示对应框左边名称所占用的宽度 
                 :rules表示该标签内使用哪种验证规则，该规则定义在script中的data内
                    通过在输入框的prop属性对应上规则
                 通过ref可以获取表单的实例对象，从而做一些操作-->
            <el-form ref="loginFormRes" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <!-- prefix-icon在输入框前面添加图标 -->
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<!-- <script src="../api/login.js"></script> -->
<script>
// import { loginApi } from '../api/login.js'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },

            //表单验证规则
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 点击重置按钮，重置表单
        resetLoginForm() {
            // this.$refs可以获取该vue中所有的ref，.loginFormRes表示获取前面定义的ref
            // resetFields()是elementUI提供的方法，作用就是重置表单的内容
            this.$refs.loginFormRes.resetFields();
        },

        // 实现表单预验证，
        login() {
            this.$refs.loginFormRes.validate(async valide => {
                if (!valide) return;
                // const result = await loginApi(this.loginForm);
                const result = await this.$axios.post('http://localhost:9999/user/login', this.loginForm);
                // 还有localstorage没有写
                console.log(result);
                // await this.$axios.post('http://localhost:9999', {
                //     data: this.loginForm
                // }).then(resp => {
                //     console.log(resp);
                // }).catch(err => {
                //     console.log(err);
                // })
                // console.log(res);
            })
        }
    }
};
</script>

<!-- // lang="scss"表示该节点支持scss语法格式 -->
<!-- // scoped是一个vue的指令，控制样式生效区间，这里表示该样式只在当前组件内生效，若去掉，则在全局生效 -->
<style lang="scss" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;

    position: absolute;
    // 将该盒子居中，首先让其距离顶部、左部分别50%
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    // 在login_box中嵌套写img的格式
    .avator_box {
        height: 130px;
        width: 130px;
        // 设置边框线
        border: 1px solid #eee;
        // 将边框设置为圆角
        border-radius: 50%;
        padding: 10px;
        // 边框添加阴影
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        // 首先图片的最左边移动至外边框的中线部分
        left: 50%;
        // 图片再向自己的左边和上边移动半个图片大小
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    width: 100%;
    bottom: 0px;
    padding: 20px;
    // box-sizing默认为content，这表示如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，
    //  并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。因此我们设置之后就会超出
    // border-box表示你想要设置的边框和内边距的值是包含在 width 内的。
    //  也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，
    //  内容区的实际宽度是 width 减 去(border + padding) 的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
    box-sizing: border-box;
}
</style>