// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {
  Loading,
  Toast,
  Button,
  Row,
  Col,
  List,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Lazyload,
  Field,
  PullRefresh,
  NavBar,Tab, Tabs 
} from 'vant'

Vue
  .use(Loading)
  .use(PullRefresh )
  .use(Toast)
  .use(Button)
  .use(Field)
  .use(NavBar)
  .use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(List)
  .use(Swipe)
  .use(Tab)
  .use(Tabs)
  .use(SwipeItem)
  .use(Lazyload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({el: '#app', router, components: {
    App
  }, template: '<App/>'})
