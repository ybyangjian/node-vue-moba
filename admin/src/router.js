import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: Main,
      children: [{
        path: '/categories/create',
        component: CategoryEdit
      }, {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true //表示当路由的id直接注入到CategoryEdit页面，可以直接使用
      }, {
        path: '/categories/list',
        component: CategoryList
      }]
    },

  ]
})