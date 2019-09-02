import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'
import './assets/iconfont/iconfont.css'

// 使用vue-awesome-swiper实现轮播图
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


// 导入卡片组件
import Card from './components/Card.vue'
Vue.component('m-card',Card); 

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)


import axios from 'axios'
Vue.prototype.$http = axios.create({
  // 请求根地址
  baseURL:'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
