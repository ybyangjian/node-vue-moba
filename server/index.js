const express = require('express')


const app = express()

// 跨域模块
app.use(require('cors')())
//让express接受json数据
app.use(express.json())
// 托管静态文件，让uploads中的文件可以通过/uploads来访问
app.use('/uploads', express.static(__dirname + '/uploads'))



require('./plugins/db')(app)
// 让admin中的index.js引用
require('./routes/admin')(app)

app.listen(3000,() =>{
    console.log('http://localhost:3000')
})