import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'


Vue.use(Router)

export default new Router({
  routes: [{
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
      }
    ]
  }]
})