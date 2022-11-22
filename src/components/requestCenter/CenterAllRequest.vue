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
                    <el-button type="primary" @click="createNewRequest">新建需求</el-button>
                </el-col>
            </el-row>

            <!-- 需求列表区域 -->
            <el-table :data="tableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="工厂" prop="factory"></el-table-column>
                <el-table-column label="系统" prop="systemUse"></el-table-column>
                <el-table-column label="需求描述" prop="description" width="250px"></el-table-column>
                <el-table-column label="提出部门" prop="department"></el-table-column>
                <el-table-column label="检讨担当" prop="createUser"></el-table-column>
                <el-table-column label="紧急程度" prop="urgent"></el-table-column>
                <el-table-column label="状态" prop="completeStatus">
                    <template slot-scope="scope">
                        <el-switch v-if="scope.row.completeStatus == '0'" v-model=switchOff></el-switch>
                        <el-switch v-else v-model=switchOn></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="175px">
                    <template slot-scope="scope">
                        <!-- 查看按钮 -->
                        <el-tooltip effect="dark" content="查看" placement="top-start" :enterable="false">
                            <el-button type="primary" icon="el-icon-more" size="mini"
                                @click="showRequestDetail(scope.row.id)">
                            </el-button>
                        </el-tooltip>
                        <!-- 修改按钮 -->
                        <el-tooltip effect="dark" content="修改" placement="top-start" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                @click="editRequestDetail(scope.row.id)">
                            </el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                @click="deleteRequest(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

        <!-- 查看和编辑的对话框 -->
        <!-- <el-dialog title="查看或修改信息" :visible.sync="editDialogVisible" width="50%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>


export default {
    data() {
        return {
            query: '',
            // 当前页数
            page: 1,
            // 当前每页多少条数据
            pageSize: 2,
            tableData: [],
            total: 0,
            switchOff: false,
            switchOn: true,
            // 控制查看何修改信息的对话框的显示与隐藏
            editDialogVisible: false,
        }
    },
    created() {
        this.getRequestList()
    },
    methods: {
        async getRequestList() {
            const params = {
                page: this.page,
                pageSize: this.pageSize,
                query: this.query
            }
            // const { data: res } = await this.$axios.get('http://localhost:9999/request/get', params)
            await this.getRequestListParams(params).then(res => {
                // console.log(res)
                if (String(res.data.code) === '1') {
                    // console.log(res)
                    this.tableData = res.data.data.records || []
                    // console.log(this.tableData)
                    this.total = res.data.data.total
                    // console.log(this.total)
                }
            }).catch(err => {
                this.$message.error('请求出错了：' + err)
            })
            // console.log(res)
        },
        createNewRequest() {
            this.$router.push('/create')
        },
        showRequestDetail(id) {
            console.log("id" + id)
            localStorage.setItem('requestId', id)
            this.$router.push('/details')
        },
        editRequestDetail(id) {
            console.log("id" + id)
            localStorage.setItem('requestId', id)
            this.$router.push('/edit')
        },
        // deleteRequest(requestId) {
        //     console.log(requestId)
        //     this.deleteRequestById(requestId).then(res => {
        //         if (res.data.code === 1) {
        //             this.$message.success('删除成功！')
        //             this.$router.push('/centerAllRequest')
        //         } else {
        //             this.$message.error(res.msg || '操作失败')
        //         }
        //     }).catch(err => {
        //         this.$message.error('请求出错了：' + err)
        //     })
        // },
        // 监听pagesize更改的事件
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.pageSize = newSize
            this.getRequestList()
        },
        // 监听当前的页码值
        handleCurrentChange(newPage) {
            // console.log(newPage)
            this.page = newPage
            this.getRequestList()
        },

        // 展示编辑信息的对话框
        // showEditDialog(id) {
        //     console.log(id)
        //     // this.editDialogVisible = true
        //     this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$message({
        //             type: 'success',
        //             message: '删除成功!'
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },

        // 以下时api方法
        getRequestListParams(params) {
            return this.$axios({
                url: 'http://localhost:9999/request/page',
                method: 'get',
                params
            })
        },
        deleteRequestById(requestId) {
            return this.$axios({
                url: `http://localhost:9999/request/${requestId}`,
                method: 'put',

            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>