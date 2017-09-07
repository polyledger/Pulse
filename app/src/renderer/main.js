import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import './assets/js/jquery.min.js'
import './assets/js/tether.min.js'
import './assets/js/chart.min.js'
import './assets/js/tablesorter.min.js'
import './assets/js/application.js'
import './assets/js/toolkit.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
