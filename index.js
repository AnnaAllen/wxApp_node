const express = require("express")

const app = express()

// 给express设置一个全局变量
app.set('secret', 'AnnaAllen')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态文件托管，使uploads中的文件可以通过'/uploads'来访问

require('./routes/admin')(app)
require('./routes/admin/classifyApi')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})