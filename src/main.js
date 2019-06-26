import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './utils/api'

//引入自定义mockjs
require('./utils/mock')

Vue.config.productionTip = false;

Vue.prototype.api = api
Vue.prototype.axios = axios
Vue.prototype.storage = window.localStorage
Vue.prototype.$devicePixelRatio = 2


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
