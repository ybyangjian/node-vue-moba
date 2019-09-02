module.exports = app => {

    const express = require('express')
    // 这是express的子路由
    const router = express.Router({
        // 合并动态参数，不然使用req.param.resource获取不到
        // 把最后一行父级的url参数合并到子路由中 
        mergeParams: true
    })

    //返回token
    const jwt = require('jsonwebtoken')

    const assert = require('http-assert')

    // 导入分类模型
    // const  Category = require('../../models/Category')
    const AdminUser = require('../../models/AdminUser')

    // 添加资源
    router.post('/', async (req, res) => {

        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })


    //资源列表 通用接口
    router.get('/', async (req, res) => {
        // 使用inflection插件进行类名转换 已经使用中间件进行处理
        // const modelName = require('inflection').classify(req.params.resource)
        // const Model = require(`../../models/${modelName}`)

        // populate是查询关联字段的
        // const items = await req.Model.find().populate('parent').limit(10)

        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        // 因为这里要进行上级查询，所以替换更通用的写法
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')




    // 通用接口函数
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)



    const multer = require('multer')
    // 图片上传的地址
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    //图片上传,使用multer插件处理,中间upload.single('file')表示单个文件上传，文件名叫file。原生的req请求没有file，是由upload加上去的
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {

        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 后台用户登录
    app.post('/admin/api/login', async (req, res) => {
        // 获取用户名和密码
        const {
            username,
            password
        } = req.body

        // 根据用户名找用户
        // 因为model中给密码设置了默认不查询到，所以需要在这里加入+password，让密码能查到
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')

        // 使用http-assert库，替换下面的代码,这里表示用户不存在返回422，和message:用户不存在
        // 当用户不存在时会报错，下面的错误处理函数会进行处理
        assert(user, 422, '用户不存在')

        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        //校验密码,比较明文与密文是否匹配,参数1：明文，参数2：密文
        const isValid = require('bcryptjs').compareSync(password, user.password)

        // 使用http-assert库，替换下面的代码,这里表示密码错误返回422，和message
        // 当密码错误时会报错，下面的错误处理函数会进行处理
        assert(password, 422, '密码错误')

        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }



        // 生成token,散列
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({
            token
        })
    })


    // 错误处理函数,捕获异常
    app.use(async (err, req, res, next) => {
        // 获取错误状态码，返回错误信息,如果没有状态码报500错误
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}