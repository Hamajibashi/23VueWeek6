<template>
  <teleport to='title'> | 後台</teleport>
    <div class="container">
      <h1 class="h2 fw-bold text-center my-4">後台</h1>
      <router-link to="/" class="btn btn-primary btn-lg"> 回到前台</router-link>
    </div>
  </template>

<script>
const baseUrl = import.meta.env.VITE_API
export default {
  methods: {
    checkLogin () {
      const url = `${baseUrl}/v2/api/user/check`
      this.axios.post(url)
        .then(res => {
          alert('登入成功！')
        })
        .catch(err => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    // 登入驗證
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, '$1') // eslint-disable-line
    this.axios.defaults.headers.common.Authorization = token
    this.checkLogin()
  }
}
</script>
