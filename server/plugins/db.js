module.exports = app =>{
    /**
     * 连接数据库
     *  module.exports 是个函数，接受参数是app
     */


    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
        useNewUrlParser: true,
        useFindAndModify:false
    })


    require('require-all')(__dirname + '/../models')

    
}