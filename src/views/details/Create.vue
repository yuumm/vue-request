<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>需求中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/centerAllRequest' }">所有需求</el-breadcrumb-item>
            <el-breadcrumb-item>新建需求</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- gutter表示不同块之间的宽度是多少 -->
            <el-row :gutter="20">
                <!-- span表示这一块的宽度是多少 -->
                <el-col :span="4">
                    <el-button type="primary" @click="saveRequest">提交新建</el-button>
                </el-col>
            </el-row>

            <!-- 需求列表区域 -->
            <el-form label-width="80px" :v-model="tableData">
                <el-form-item label="工厂" prop="factory">
                    <el-input v-model="tableData.factory"></el-input>
                </el-form-item>
                <el-form-item label="系统" prop="systemUse">
                    <el-input v-model="tableData.systemUse"></el-input>
                </el-form-item>
                <el-form-item label="需求背景" prop="background">
                    <el-input type="textarea" v-model="tableData.background"></el-input>
                </el-form-item>
                <el-form-item label="需求描述" prop="description">
                    <el-input type="textarea" v-model="tableData.description"></el-input>
                </el-form-item>
                <el-form-item label="价值体现" prop="requestValue">
                    <el-input v-model="tableData.requestValue"></el-input>
                </el-form-item>
                <el-form-item label="提出部门" prop="department">
                    <el-input v-model="tableData.department"></el-input>
                </el-form-item>
                <el-form-item label="提出人" prop="requestPerson">
                    <el-input v-model="tableData.requestPerson"></el-input>
                </el-form-item>
                <el-form-item label="检讨人" prop="createUser">
                    <el-input v-model="tableData.createUser"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" prop="createTime">
                    <el-input v-model="tableData.createTime"></el-input>
                </el-form-item>
                <el-form-item label="期望日期" prop="requestTime">
                    <el-input v-model="tableData.requestTime"></el-input>
                </el-form-item>
                <el-form-item label="紧急程度" prop="urgent">
                    <el-input v-model="tableData.urgent"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>


export default {
    data() {
        return {
            tableData: {
                'factory': '',
                'systemUse': '',
                'createTime': '',
                'background': '',
                'description': '',
                'requestValue': '',
                'department': '',
                'requestPerson': '',
                'createUser': '',
                'requestTime': '',
                'urgent': '',
                'progress': '',
                'startTime': '',
                'endTime': '',
                'completeStatus': '',
                'takeStatus': ''
            },
        }
    },
    created() {
        this.tableData.createUser = window.sessionStorage.getItem("user")
    },
    methods: {
        saveRequest() {
            const params = this.tableData
            this.saveRequestApi(params).then(res => {
                if (res.data.code === 1) {
                    this.$message.success('需求添加成功！')
                    this.$router.push('/centerAllRequest')
                } else {
                    this.$message.error(res.msg || '操作失败')
                }
            }).catch(err => {
                this.$message.error('请求出错了：' + err)
            })
        },

        // 以下是api方法

        // 编辑需求信息
        saveRequestApi(params) {
            return this.$axios({
                url: 'http://localhost:9999/request/save',
                method: 'post',
                data: params
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>