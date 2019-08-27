const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 物品名称
    name: {
        type: String
    },
    // 头像 
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('Item', schema)