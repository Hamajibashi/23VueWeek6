<template>
    <teleport to="title"> | 產品詳細 {{ product.title }}</teleport>
      <h1 class="h2 fw-bold my-4">{{ product.title }}</h1>
      <div class="row">
          <div class="col">
              <img :src="product.imageUrl" alt="">
          </div>
          <div class="col">
              <h4>{{ product.description }}</h4>
              <h3 class="text-danger">$ {{ product.price }}</h3>
          </div>
      </div>
  </template>

<script>
const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    // loading 效果
    addLoading () {
      const loader = this.$loading.show()
      setTimeout(() => {
        loader.hide()
      }, 300)
    },
    getProduct () {
      const { id } = this.$route.params
      const url = `${baseUrl}/v2/api/${apiPath}/product/${id}`
      this.axios.get(url)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  mounted () {
    this.addLoading()
    this.getProduct()
  }
}
</script>
