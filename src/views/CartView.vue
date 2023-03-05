<template>
    <teleport to="title"> | 購物車</teleport>
    <div class="mt-4">
        <h1 class="h2 fw-bold mb-4 text-center">購物車</h1>
        <!-- 購物車列表 -->
        <div class="text-end">
          <button class="btn btn-outline-danger mb-4" type="button" :disabled="cart.carts.length === 0"
            @click="removeAll">清空購物車</button>
        </div>
        <table class="table align-middle" v-if="cart.carts.length !== 0">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
              <th class="text-end">總價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" :disabled="item.id === loadingItem"
                    @click="removeItem(item.id)">
                    x
                  </button>
                </td>
                <td width="200px">
                  <img :src="item.product.imageUrl" alt="產品圖片" class="object-fit-cover" style="height: 100px; width: 100px;">
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <select name="" class="form-select" v-model="item.qty" :disabled="item.id === loadingItem"
                        @change="updateItem(item)">
                        <option :value="i" v-for="i in 10" :key="i">{{ i }}</option>
                      </select>
                      <span class="input-group-text" id="basic-addon2">{{ item.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  $ {{ item.product.price }}
                </td>
                <td class="text-end">
                  $ {{ item.product.price * item.qty }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" class="text-end fw-bold">總計</td>
              <td class="text-end fw-bold fs-3">$ {{ cart.total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex flex-column justify-content-center align-items-center" v-else>
          <h4 class="my-4">
            購物車目前沒有商品哦！
          </h4>
          <router-link to="/products" class="btn btn-danger btn-lg">快來逛逛</router-link>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <VeeForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VeeField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></VeeField>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VeeField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VeeField>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VeeField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|integer" v-model="form.user.tel"></VeeField>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VeeField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="form.user.address"></VeeField>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VeeField id="message" name="留言" class="form-control" cols="30" rows="10" v-model="form.message"
              as="textarea"></VeeField>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger" :disabled="cart.carts.length === 0">送出訂單</button>
          </div>
        </VeeForm>
      </div>
  </template>

<script>
const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH
export default {
  data () {
    return {
      cart: {
        carts: []
      },
      loadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
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
    // 取得購物車
    getCart () {
      const url = `${baseUrl}/v2/api/${apiPath}/cart`
      this.axios.get(url)
        .then(res => {
          this.cart = res.data.data
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    // 扁更產品數量
    updateItem (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      const url = `${baseUrl}/v2/api/${apiPath}/cart/${item.id}`
      this.axios.put(url, { data })
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.loadingItem = ''
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    // 刪除全部購物車
    removeAll () {
      const url = `${baseUrl}/v2/api/${apiPath}/carts`
      this.axios.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    // 刪除單一產品
    removeItem (id) {
      this.loadingItem = id
      const url = `${baseUrl}/v2/api/${apiPath}/cart/${id}`
      this.axios.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.loadingItem = ''
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    // 送出訂單
    createOrder () {
      const data = this.form
      const url = `${baseUrl}/v2/api/${apiPath}/order`
      this.axios.post(url, { data })
        .then(res => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.addLoading()
    this.getCart()
  }
}
</script>
