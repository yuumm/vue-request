function loginApi(data) {
    return this.$axios({
        'url': '/employee/login',
        'method': 'post',
        data
    })
}

export {
    loginApi
}