<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>需求中心</el-breadcrumb-item>
            <el-breadcrumb-item>所有需求</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- gutter表示不同块之间的宽度是多少 -->
            <el-row :gutter="20">
                <!-- span表示这一块的宽度是多少 -->
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">新建需求</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pageNum: '',
                pageSize: ''
            }
        }
    },
    created() {
        this.getRequestList()
    },
    methods: {
        getRequestList() {
            this.$axios.get()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>