const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createExtraTime: { type: Date, default: Date.now}, // 创建小料时间
    extraName: { type: String}, // 小料名
    extraPrice: { type: Number}, // 小料价格
})

module.exports = mongoose.model('Extra', schema)