const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userCreateTime: { type: Date, default: Date.now},
  userName: { type: String },
  password: { 
    type: String, 
    // select: false, // 默认无法被查询
    // 密码进行散列加密 npm i bcrypt
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
   },
  weChatNumBer: { type: String, default: '' },
  userEmail: { type:String }
})

module.exports = mongoose.model('AdminUser', schema)