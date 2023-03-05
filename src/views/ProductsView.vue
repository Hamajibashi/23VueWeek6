<template>
    <teleport to="title"> | 產品列表</teleport>
    <div class="container">
      <div class="mt-4">
        <h1 class="h2 fw-bold mb-4 text-center">產品列表</h1>
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td style="width: 200px">
                <div :style="{ backgroundImage: `url(${product.imageUrl})` }"
                  style="height: 100px; background-size: cover; background-position: center"></div>
              </td>
              <td>
                {{ product.title }}
              </td>
              <td>
                <div class="h5" v-if="product.price === product.origin_price">{{ product.price }} 元
                </div>
                <div v-else>
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ product.price }} 元</div>
                </div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">查看更多</router-link>
                  <button type="button" class="btn btn-outline-danger" :disabled="product.id === loadingItem"
                    @click="addToCart(product.id)">
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-show="product.id === loadingItem"></span>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<script>
const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH
export default {
  data () {
    return {
      products: [],
      productId: [],
      loadingItem: ''
    }
  },
  methods: {
    // loading 效果
    addLoading () {
      const loader = this.$loading.show()
      setTimeout(() => {
        loader.hide()
      }, 800)
    },
    // 取得產品
    getProducts () {
      const url = `${baseUrl}/v2/api/${apiPath}/products`
      this.axios.get(url)
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    // 加入購物車
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.loadingItem = id
      const url = `${baseUrl}/v2/api/${apiPath}/cart`
      this.axios.post(url, { data })
        .then(res => {
          alert(res.data.message)
          this.loadingItem = ''
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.addLoading()
    this.getProducts()
  }
}
</script>
