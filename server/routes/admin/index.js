module.exports = app => {

    const express = require('express')
    // 这是express的子路由
    const router = express.Router()
    // 导入分类模型
    const Category = require('../../models/Category')

    // 添加分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    //修改分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除分类
    router.delete('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success:true
        })
    })


    //分类列表
    router.get('/categories', async (req, res) => {
        // populate是查询关联字段的
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })

    //分类详情
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })




    app.use('/admin/api', router)
}