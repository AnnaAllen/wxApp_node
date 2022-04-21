const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createExtraTime: { type: Date, default: Date.now }, // 创建时间
    swiperArr: { type: Array }, // 轮播图
    hotShop: { type: Array }, // 本店热销, 存储热销物品的id
    hotShop: { type: Array }, // 本店热销, 存储热销物品的id
    shopLogo: { typr: String }, // 商店logo
    shopName: { type: String }, // 商店名称
    ShopMsg: { type: String } // 商店描述
})

module.exports = mongoose.model('WeAppIndex', schema)