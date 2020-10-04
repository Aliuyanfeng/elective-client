import Vue from 'vue'
import App from './App'

//公共配置文件
import '../../globalConfig.js'
//路由文件
import router from '../../router/router.js'
//全局过滤器
import '../../filter.js'
//绑定原型属性

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  components: {
    App
  },
  template: '<App/>'
})
