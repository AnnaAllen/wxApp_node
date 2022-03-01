const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createClassifyTime: { type: Date, default: Date.now}, // 创建分类时间
    classifyName: { type: String}, // 分类名
})

module.exports = mongoose.model('Classify', schema)