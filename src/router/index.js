import Vue from 'vue'
import Router from 'vue-router'
import  shoppingMall  from "@/components/pages/shoppingMall";
import  register  from "@/components/pages/register";
import  login  from "@/components/pages/login";
import  goods  from "@/components/pages/goods";
import  categoryList  from "@/components/pages/categoryList";
import  cart  from "@/components/pages/cart";




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shoppingMall',
      component: shoppingMall
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: goods
    },
    {
      path: '/categoryList',
      name: 'categoryList',
      component: categoryList
    },
  ]
})
