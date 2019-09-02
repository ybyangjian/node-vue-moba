const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    // 表示类型是mongodb数据库的id，类似于_id,ref表示要关联的模型，关联了分类模型，实现父子级分类
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})


schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

schema.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

module.exports = mongoose.model('Category',schema)