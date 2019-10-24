import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store'
import api from '@/api/index' // 导入api接口

Vue.prototype.axios = api // 将api挂载到vue的原型上
if (process.env.NODE_ENV === 'development') {
  require('@/mock/index.js')
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
