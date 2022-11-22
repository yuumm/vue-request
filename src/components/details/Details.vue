<template>
    <div class="container">
        <el-container>
            <el-header></el-header>
            <div class="details_box">
                <el-main>
                    <el-form ref="detailsFormRes" :model="detailsForm" label-width="80px" :rules="rules">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="detailsForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="工号" prop="username">
                            <el-input v-model="detailsForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="detailsForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="座机">
                            <el-input v-model="detailsForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:" prop="sex">
                            <el-radio-group v-model="detailsForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="register">立即注册</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </div>
        </el-container>

    </div>
</template>

<script>
export default {
    data() {
        return {
            detailsForm: {
                name: '',
                username: '',
                password: '',
                phone: '',
                sex: '',
            },
            rules: {

                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                username: [{ required: true, message: '请输入工号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],

            }
        }
    },
    methods: {
        register() {
            console.log('submit!');
            this.$refs.registerFormRes.validate(async valide => {
                if (!valide) return;
                // const result = await loginApi(this.loginForm);
                let result = await this.$axios.post('http://localhost:9999/user/register', this.registerForm);
                console.log(result);
                if (String(result.data.code) == '1') {
                    console.log(result.code);
                    console.log(result.data.code);
                    console.log(this.registerForm);
                    // localStorage表示将数据保存在浏览器本地，
                    // JSON.stringify(res.data)表示将数据转换为json格式
                    localStorage.setItem('userInfo', JSON.stringify(result.data))
                    this.$message({ showClose: true, message: '注册成功，请登录', type: 'success' });
                    this.$router.push('/login')
                    // window.location.href = '/backend/index.html'
                } else {
                    this.$message({ showClose: true, message: result.data.msg, type: 'error' });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.register_box {
    width: 1000px;
    height: 100%;
    margin-top: 60px;
    background-color: white;
    border-radius: 3px;

    position: absolute;
    // 将该盒子居中，首先让其距离顶部、左部分别50%
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.el-header {
    //下两行表示将内容分布在容器两端
    // 以fles方式显示，
    display: flex;
    //space-between表示分布在该容器的两端
    justify-content: space-between;
    // 表示将内部组件上下居中
    align-items: center;

    // 下面是对文字的格式设置
    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.register_form {
    align-items: center;
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