<template>
    <teleport to="title"> | 404 NOT FOUND</teleport>
      <div class="container">
          <h1 class="h2 fw-bold text-center my-4">⚠️尋找的頁面不存在</h1>
          <a href="#" class="btn btn-primary btn-lg" @click.prevent="prePage"> 回到上一頁</a>
      </div>
  </template>

<script>
export default {
  methods: {
    prePage () {
      this.$router.go(-1)
    }
  }
}
</script>
