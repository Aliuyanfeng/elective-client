import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/arouter.js'
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
  },
  {
    path: '/alogin',
    name: 'aLogin',
    component: resolve => (require(['@/components/admin/alogin.vue'], resolve))
  }, {
    path: '/admin',
    name: 'Admin',
    component: resolve => (require(['@/components/admin/admin.vue'], resolve)),
    children: [{
      path: '/admin',
      redirect: '/admin/articleList'
    }, {
      path: '/admin/articleList',
      component: resolve => (require(['@/components/admin/articleList.vue'], resolve)),

    }, {
      path: '/admin/articleDetails',
      component: resolve => (require(['@/components/admin/articleDetails.vue'], resolve))
    }, {
      path: '/admin/write',
      component: resolve => (require(['@/components/admin/write.vue'], resolve))
    }, {
      path: '/admin/courseList',
      component: resolve => (require(['@/components/admin/courseList.vue'], resolve)),
    }, {
      path: '/admin/courseEdit',
      component: resolve => (require(['@/components/admin/courseEdit.vue'], resolve)),
    }, {
      path: '/admin/addCourse',
      component: resolve => (require(['@/components/admin/addCourse.vue'], resolve))
    }, {
      path: '/admin/addManyCourse',
      component: resolve => (require(['@/components/admin/addManyCourse.vue'], resolve))
    }, {
      path: '/admin/classify',
      component: resolve => (require(['@/components/admin/classify.vue'], resolve))
    }, {
      path: '/admin/module',
      component: resolve => (require(['@/components/admin/module.vue'], resolve))
    }, {
      path: '/admin/addStudent',
      component: resolve => (require(['@/components/admin/addStudent.vue'], resolve))
    }, {
      path: '/admin/addManyStudent',
      component: resolve => (require(['@/components/admin/addManyStudent.vue'], resolve))
    }, {
      path: '/admin/studentList',
      component: resolve => (require(['@/components/admin/studentList.vue'], resolve))
    }, {
      path: '/admin/studentEdit',
      component: resolve => (require(['@/components/admin/studentEdit.vue'], resolve))
    }, {
      path: '/admin/dataBackup',
      component: resolve => (require(['@/components/admin/dataBackup.vue'], resolve))
    }, {
      path: '/admin/dataExport',
      component: resolve => (require(['@/components/admin/dataExport.vue'], resolve))
    },]
  }, {
    path: '/*',
    name: 'Error',
    component: resolve => (require(['@/components/public/404.vue'], resolve))
  }
  ]
})

// router.beforeEach((to, from, next) => {
//   // 404
//   if (to.matched.length === 0) { //如果未匹配到路由
//     next('/error'); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
//   } else {
//     next(); //如果匹配到正确跳转
//   }

//   //token
//   if (to.path === '/login' || to.path === '/alogin') { //若要跳转的页面是登录界面
//     next(); //直接跳转
//   } else {
//     let token = localStorage.getItem('studentToken'); //获取本地存储的token值
//     if (token === null || token === '') { //若token为空则验证不成功，跳转到登录页面
//       Message.error('请先登录')
//       next('/login');
//     } else { //不为空则验证成功
//       next();
//     }
//   }
// })
