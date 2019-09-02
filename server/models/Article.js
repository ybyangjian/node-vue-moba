const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 标题
    title: {
        type: String
    },
    // 分类,一篇文章可能有多个分类
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    // 文章正文
    body: {
        type: String
    },

}, {
    // 创建时间
    timestamps: true
})

module.exports = mongoose.model('Article', schema)