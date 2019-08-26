module.exports = app => {

    const express = require('express')
    // 这是express的子路由
    const router = express.Router({
        // 合并动态参数，不然使用req.param.resource获取不到
        // 把最后一行父级的url参数合并到子路由中 
        mergeParams: true
    })
    // 导入分类模型
    // const  Category = require('../../models/Category')

    // 添加分类
    router.post('/', async (req, res) => {

        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改分类
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除分类
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })


    //分类列表 通用接口
    router.get('/', async (req, res) => {
        // 使用inflection插件进行类名转换 已经使用中间件进行处理
        // const modelName = require('inflection').classify(req.params.resource)
        // const Model = require(`../../models/${modelName}`)

        // populate是查询关联字段的
        // const items = await req.Model.find().populate('parent').limit(10)

        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        // 因为这里要进行上级查询，所以替换更通用的写法
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    //分类详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })




    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        // 使用inflection插件进行类名转换，在这里使用中间件处理，就不用在每个接口中添加这两行代码
        const modelName = require('inflection').classify(req.params.resource)
        // 在请求对象上添加这个Model
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}