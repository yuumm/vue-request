<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            // 清空localstorage
            localStorage.removeItem("userInfo");
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="scss" scoped>

</style>