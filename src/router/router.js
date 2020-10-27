import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/router.js'
import {
  Message
} from 'element-ui'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      redirect: '/login'
    }, {
      path: '/admin.html',
      redirect: '/alogin'
    }, {
      path: '/login',
      name: 'Login',
      component: resolve => (require(['@/components/index/login.vue'], resolve))
    },
    {
      path: '/alogin',
      name: 'aLogin',
      component: resolve => (require(['@/components/admin/alogin.vue'], resolve))
    }, {
      path: '/index.html',
      redirect: '/login'
    }, {
      path: '/main',
      name: 'Main',
      component: resolve => (require(['@/components/index/main.vue'], resolve)),
      children: [{
        path: '/main',
        redirect: '/main/home'
      }, {
        path: '/main/home',
        component: resolve => (require(['@/components/index/home.vue'], resolve))
      }, {
        path: '/main/news',
        component: resolve => (require(['@/components/index/news.vue'], resolve)),
      }, {
        path: '/main/news/newsdetails',
        component: resolve => (require(['@/components/index/newsdetails.vue'], resolve))
      }, {
        path: '/main/schedule',
        component: resolve => (require(['@/components/index/schedule.vue'], resolve))
      }, {
        path: '/main/record',
        component: resolve => (require(['@/components/index/record.vue'], resolve))
      }, {
        path: '/main/classifyAnalyse',
        component: resolve => (require(['@/components/index/classifyAnalyse.vue'], resolve))
      }, {
        path: '/main/moduleAnalyse',
        component: resolve => (require(['@/components/index/moduleAnalyse.vue'], resolve))
      }]
    }, {
      path: '/*',
      name: 'Error',
      component: resolve => (require(['@/components/public/404.vue'], resolve))
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 404
  if (to.matched.length === 0) { //如果未匹配到路由
    next('/error'); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }

  //user


  //token
  if (to.path === '/login' || to.path === '/alogin') { //若要跳转的页面是登录界面
    next(); //直接跳转
  } else {
    let token = sessionStorage.getItem('studentToken'); //获取本地存储的token值
    if (token === null || token === '') { //若token为空则验证不成功，跳转到登录页面
      Message.error('请先登录')
      next('/login');
    } else { //不为空则验证成功
      next();
    }
  }

})
