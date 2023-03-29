import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
Vue.prototype.$axios = axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//全局注入ElementUI
Vue.use(ElementUI);

import less from 'less'
Vue.use(less)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
