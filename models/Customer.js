const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createTime: { type: Date, default: Date.now}, // 创建时间
    userName: { type: String}, // 用户名
    userPhone: { type: Number}, // 用户手机号
    userImg: { type: String}, // 用户头像
    userAddress: { type: String}, // 用户收货地址
})

module.exports = mongoose.model('Customer', schema)