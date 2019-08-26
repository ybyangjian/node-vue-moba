const express = require('express')

const app = express()

// 跨域模块
app.use(require('cors')())
//让express接受json数据
app.use(express.json())



require('./plugins/db')(app)
// 让admin中的index.js引用
require('./routes/admin')(app)

app.listen(3000,() =>{
    console.log('http://localhost:3000')
})