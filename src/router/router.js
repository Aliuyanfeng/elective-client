import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/router.js'

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
        component: resolve => (require(['@/components/index/news.vue'], resolve))
      }, {
        path: '/main/schedule',
        component: resolve => (require(['@/components/index/schedule.vue'], resolve))
      }, {
        path: '/main/record',
        component: resolve => (require(['@/components/index/record.vue'], resolve))
      }, {
        path: '/main/analyse',
        component: resolve => (require(['@/components/index/analyse.vue'], resolve))
      }]
    }, {
      path: '/admin',
      component: resolve => (require(['@/components/admin/admin.vue'], resolve)),
    }, {
      path: '/*',
      name: 'Error',
      component: resolve => (require(['@/components/public/404.vue'], resolve))
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.matched.length === 0) { //如果未匹配到路由
    from.path ? next({
      path: from.path
    }) : next('/error'); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
})
