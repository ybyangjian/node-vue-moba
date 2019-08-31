const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 用户名
    username: {
        type: String
    },
    //密码
    password:{
        type:String,
        // 设置密码在查询的时候不要带有这个数据，避免二次散列
        select:false,
        //对密码进行加密
        set(val){
            // hashSync(val,10)是个同步方法,值和散列等级，通常10-12就行
            return require('bcryptjs').hashSync(val,10)
        }
    }
   
})

module.exports = mongoose.model('AdminUser', schema)