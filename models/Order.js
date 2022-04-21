const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createOrderTime: { type: Date, default: Date.now }, // 创建时间
    AllPrice: { type: Number }, // 总价
    orderItem: { type: Object }, // 订单数组
    eatType: { type:Object }, // 就餐方式
    status: { type: String  }, // 订单状态
    userName: { type:String }, // 用户名
    orderId: { type: Number, default: 0 } // 订单编号
})

module.exports = mongoose.model('Order', schema)