import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import carryDetail from '../views/carryDetail.vue'
import Cart from '../views/Cart.vue'
import Check from '../views/Check.vue'
import Done from '../views/Done.vue'
import Order from '../views/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/about/:item_id?/detail',
    name: 'carryDetail',
    component: carryDetail,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/check',
    name: 'Check',
    component: Check
  },
  {
    path: '/done',
    name: 'Done',
    component: Done
  },
  {
    path: '/Order',
    name: 'Order',
    component: Order
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
