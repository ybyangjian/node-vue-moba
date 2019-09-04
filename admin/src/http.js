import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // 后台的根接口
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
})

// 在前端请求头中添加Authorization，里面带有Bearer + token，用于验证
http.interceptors.request.use(config => {
    // 没有token时就不添加Authorization
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    
    return config
})

// 给整个http请求加个拦截器,通用的错误处理
http.interceptors.response.use(res => {
    // 正常请求走到这里
    return res
}, err => {
    if (err.response.data.message) {
        // 其它请求走到这里
        // console.log(err.response.data.message)
        // 使用elementui 中的方法显示错误信息
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        // 当用户未登录且状态码是401时跳转到登录页
        if(err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http