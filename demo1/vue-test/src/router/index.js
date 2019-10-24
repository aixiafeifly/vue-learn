import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('@/components/login/login')
const product = () => import('@/views/product/product')
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: 'product',
      component: product
    }

  ]
})
export default router
