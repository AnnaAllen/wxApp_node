const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    menu: { type: String }, // 菜名
    price: { type: Number }, // 价格
    createTime: { type: Date, default: Date.now}, // 创建时间
    menuType: { type: String}, // 所属类别
    menuTypeId: { type: String}, // 所属类别id
    menuImage: {type: String}, // 菜品图片
    describe: { type: String, default: '' }, // 菜品描述
    isHot: {type: Boolean, default: false} // 是否热销
})

module.exports = mongoose.model('Categroy', schema)