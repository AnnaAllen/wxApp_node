const express = require("express")
const app = express()

// 给express设置一个全局变量
app.set('secret', 'AnnaAllen')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态文件托管，使uploads中的文件可以通过'/uploads'来访问

var bodyParser = require('body-parser');

//只要加入这个配置，在req请求对象上会多出来一个属性
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

require('./routes/admin')(app)
require('./routes/admin/classifyApi')(app)
require('./routes/admin/weAppIndex')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})