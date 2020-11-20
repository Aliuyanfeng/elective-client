import Vue from 'vue'

//配置elemnt-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//配置markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


//配置echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

axios.defaults.headers.common['studentToken'] = localStorage.studentToken;


//配置axios
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.headers.common['Authorization'] = localStorage.getItem("studentToken");
// 全局配置拦截器
axios.interceptors.request.use(config => {
  //判断是否存在token，如果存在将每个页面的header都添加token
  const token = window.sessionStorage.getItem("adminToken");
  // console.log('登录的token' + token)
  config.headers.Authorization = token;
  return config;

}, error => {
  // 请求错误
  return Promise.reject(error);
});

//respone拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为0，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          console.log("身份验证失败，请关闭重新进入。");
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          console.log("登录过期，请关闭重新进入。");
          window.sessionStorage.removeItem('studenToken')
          break;

        // 404请求不存在
        case 404:
          console.log("您访问的网页不存在。");
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);






//全局函数注册处理路由异常
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
