import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 載入規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  // 載入繁體中文語系
  generateMessage: localize({ zh_TW: zhTW }),
  // 當輸入任何內容直接進行驗證
  validateOnInput: true
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(LoadingPlugin)

app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
