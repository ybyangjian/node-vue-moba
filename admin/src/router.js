import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'login',
      component: Login,
      // 需要公开访问的添加，这样只有登录页能公开访问
      meta:{isPublic:true}
    },
    {
      //后台管理页
      path: '/',
      name: 'main',
      component: Main,
      children: [
        // 分类
        {
          path: '/categories/create',
          component: CategoryEdit
        }, {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true //表示当路由的id直接注入到CategoryEdit页面，可以直接使用
        }, {
          path: '/categories/list',
          component: CategoryList
        },

        // 物品
        {
          path: '/items/create',
          component: ItemEdit
        }, {
          path: '/items/edit/:id',
          component: ItemEdit,
          props: true //表示当路由的id直接注入到ItemEdit页面，可以直接使用
        }, {
          path: '/items/list',
          component: ItemList
        },

        // 英雄
        {
          path: '/heroes/create',
          component: HeroEdit
        }, {
          path: '/heroes/edit/:id',
          component: HeroEdit,
          props: true //表示当路由的id直接注入到HearEdit页面，可以直接使用
        }, {
          path: '/heroes/list',
          component: HeroList
        },

        // 文章
        {
          path: '/articles/create',
          component: ArticleEdit
        }, {
          path: '/articles/edit/:id',
          component: ArticleEdit,
          props: true //表示当路由的id直接注入到HearEdit页面，可以直接使用
        }, {
          path: '/articles/list',
          component: ArticleList
        },

        // 广告位
        {
          path: '/ads/create',
          component: AdEdit
        }, {
          path: '/ads/edit/:id',
          component: AdEdit,
          props: true //表示当路由的id直接注入到HearEdit页面，可以直接使用
        }, {
          path: '/ads/list',
          component: AdList
        },

        // 管理员
        {
          path: '/admin_users/create',
          component: AdminUserEdit
        }, {
          path: '/admin_users/edit/:id',
          component: AdminUserEdit,
          props: true //表示当路由的id直接注入到HearEdit页面，可以直接使用
        }, {
          path: '/admin_users/list',
          component: AdminUserList
        }
      ]
    }
  ]
})

// 路由守护，to去哪个页面，from来自哪个页面，next怎么处理
router.beforeEach((to,from,next) =>{
  // 如果用户访问时没有上面添加的isPublic和token，就跳转到登录页
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router