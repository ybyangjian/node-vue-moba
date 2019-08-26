const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    // 表示类型是mongodb数据库的id，类似于_id,ref表示要关联的模型，关联了分类模型，实现父子级分类
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

module.exports = mongoose.model('Category',schema)