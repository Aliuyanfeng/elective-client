// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './Admin.vue'
import router from '../../router/router.js'
import  '../../globalConfig.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  components: { Admin },
  template: '<Admin/>'
})
