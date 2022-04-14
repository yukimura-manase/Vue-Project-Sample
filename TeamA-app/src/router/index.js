import Vue from 'vue'
import VueRouter from 'vue-router'
import Serch from '../views/Serch.vue'
import Cart from '../views/Cart.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Buyhistory from '../views/Buyhistory.vue'
import Orderfinish from '../views/Orderfinish.vue'
import orderRireki from '../views/orderRireki.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Serch",
    component: Serch
  },{
    path:"/cart",
    name:"Cart",
    component: Cart
  },
  {
    path:"/itemdetail",
    name:"ItemDetail",
    component: ItemDetail
  },
  {
    path:"/Buyhistory",
    name:"Buyhistory",
    component: Buyhistory
  },
  {
    path:"/Orderfinish",
    name:"Orderfinish",
    component: Orderfinish
  },
  {
    path:"/orderRireki",
    name:"orderRireki",
    component: orderRireki,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
