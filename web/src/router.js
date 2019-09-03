import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Article from './views/Article.vue'
import Hero from './views/Hero.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Main,
      children: [{
        path: '/',
        name: 'home',
        component: Home
      }, {
        path: '/articles/:id',
        name: 'article',
        component: Article,
        // 将path中的参数都映射为组件参数
        props: true
      }]
    },{
      path: '/heroes/:id',
      name: 'hero',
      component: Hero,
      // 将path中的参数都映射为组件参数
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})