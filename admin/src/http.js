import axios from 'axios'

const http = axios.create({
    // 后台的根接口
    baseURL:'http://localhost:3000/admin/api'
})


export default http