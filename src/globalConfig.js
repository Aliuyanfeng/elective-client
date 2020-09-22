import Vue from 'vue'

//配置elemnt-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//配置echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//配置axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: '/'
})

/* 定义不同入口，跳转路径配置 index.js*/
// if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
//   Vue.prototype.HTTPLOCAT = '/dist'
//   console.log('local')
// } else {
//   const http = window.location.protocol + '//' + location.hostname + ':' + location.port
//   Vue.prototype.HTTPLOCAT = http + '/dist' // （这个路径改为你服务器的路径）
// }
