module.exports = options => {

    return async (req, res, next) => {
        // 使用inflection插件进行类名转换，在这里使用中间件处理，就不用在每个接口中添加这两行代码
        const modelName = require('inflection').classify(req.params.resource)
        // 在请求对象上添加这个Model
        // ../../models/${modelName}
        req.Model = require(`../models/${modelName}`)
        next()
    }
}