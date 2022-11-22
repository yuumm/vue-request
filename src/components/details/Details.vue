<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>需求中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/centerAllRequest' }">所有需求</el-breadcrumb-item>
            <el-breadcrumb-item>详细内容</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- gutter表示不同块之间的宽度是多少 -->
            <el-row :gutter="20">
                <!-- span表示这一块的宽度是多少 -->
                <el-col :span="4">
                    <el-button type="primary">编辑需求</el-button>
                </el-col>
            </el-row>

            <!-- 需求列表区域 -->
            <el-form label-width="80px" :v-model="tableData">
                <el-form-item label="工厂" prop="factory">
                    <el-input v-model="tableData.factory" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统" prop="systemUse">
                    <el-input v-model="tableData.systemUse" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="tableData.createTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="需求背景" prop="background">
                    <el-input type="textarea" v-model="tableData.background" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="需求描述" prop="description">
                    <el-input type="textarea" v-model="tableData.description" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="价值体现" prop="requestValue">
                    <el-input v-model="tableData.requestValue" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="提出部门" prop="department">
                    <el-input v-model="tableData.department" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="提出人" prop="requestPerson">
                    <el-input v-model="tableData.requestPerson" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="检讨人" prop="createUser">
                    <el-input v-model="tableData.createUser" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="期望日期" prop="requestTime">
                    <el-input v-model="tableData.requestTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="紧急程度" prop="urgent">
                    <el-input v-model="tableData.urgent" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="进度" prop="progress">
                    <el-input v-model="tableData.progress" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                    <el-input v-model="tableData.startTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="完成时间" prop="endTime">
                    <el-input v-model="tableData.endTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="完成情况" prop="completeStatus">
                    <el-input v-if="tableData.completeStatus == 0" v-model="completeStatusOff" :disabled="true">
                    </el-input>
                    <el-input v-if="tableData.completeStatus == 1" v-model="completeStatusOn" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="领取情况" prop="takeStatus">
                    <el-input v-if="tableData.takeStatus == 0" v-model="takeStatusOff" :disabled="true">
                    </el-input>
                    <el-input v-if="tableData.takeStatus == 1" v-model="takeStatusOn" :disabled="true">
                    </el-input>
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
            completeStatusOn: '已完成',
            completeStatusOff: '未完成',
            takeStatusOn: '已领取',
            takeStatusOff: '未领取',
        }
    },
    created() {
        this.getRequestDetail()
        // this.getRequestList()
        // this.tableData.factory = 2
    },
    methods: {
        async getRequestDetail() {
            const requestId = localStorage.getItem("requestId")
            await this.getRequestDetailById(requestId).then(res => {
                console.log(res)
                if (String(res.data.code) === '1') {
                    console.log(res.data)
                    this.tableData = res.data.data
                    // this.ruleForm.password = ''
                } else {
                    this.$message.error(res.msg || '操作失败')
                }
            })
            console.log(requestId)
        },

        // 以下是api方法
        getRequestDetailById(requestId) {
            return this.$axios({
                url: `http://localhost:9999/request/${requestId}`,
                method: 'get'
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>