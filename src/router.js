import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/goods',
    // component: Goods
  },
  {
    path: '/goods',
    name: 'goods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/goods/goods.vue')
  },
  {
    path: '/ratings',
    name: 'ratings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/ratings/ratings.vue')
  },
  {
    path: '/seller',
    name: 'seller',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/seller/seller.vue')
  }
]

let $router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:'linkActiveClass',
  routes
})

//跳转前触发
$router.beforeEach((to, from, next) => {
  if(to.name === 'home'){
    console.log(to)
  }
  next()
})

//跳转后触发
$router.afterEach((to, from, next) => {
  //console.log(from)
  // setTimeout(() => window.scrollTo(0, 0), 0)
})

export default $router
