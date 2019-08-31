const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 广告名称
    name: {
        type: String
    },
    // 广告
    items: [{
        // 广告图片
        image: {
            type: String
        },
        // 广告url
        url: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Ad', schema)