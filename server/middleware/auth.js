module.exports = options => {

    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')


    return async (req, res, next) => {
        // 获取在请求头添加的authorization中的token
        const token = String(req.headers.authorization || '').split(' ').pop()

        // assert(token,401,'请提供jwt token')
        assert(token, 401, '请先登录')
        // 校验token,获取token中的用户id，用户id是在生成token时添加进去的
        const {
            id
        } = jwt.verify(token, req.app.get('secret'))
        // assert(token,401,'无效的jwt token')
        assert(token, 401, '请先登录')
        // 根据id查找用户,将用户添加到req.user(请求中)中，这样在其它函数也能获取到用户
        req.user = await AdminUser.findById(id)

        // 使用http-assert库，
        // 当用户不存在时会报错，下面的错误处理函数会进行处理
        assert(req.user, 401, '请先登录')

        await next()
    }
}