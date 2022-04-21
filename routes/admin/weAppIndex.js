module.exports = app => {
	const express = require('express')
	const router = express.Router() //这里是express的一个子路由

	const Classify = require('../../models/Classify')
	const Extra = require('../../models/Extra')
  const WeAppIndex = require('../../models/Index.js')
  const Category = require('../../models/Category')
  const Order = require('../../models/Order')

  // 创建首页
  router.post('/weApp', async (req, res) => {
    // console.log(req.body)
    const data = await WeAppIndex.find()
    if(data) {
      const model = await WeAppIndex.findByIdAndUpdate(req.body.id, req.body)
      res.send({
        model,
        code: 0,
        msg: '修改成功'
      })
      return
    }
    const model = await WeAppIndex.create(req.body)
		res.send({
			model,
			code: 0,
      msg: '创建成功'
		})
  })
  // 查询首页
  router.get('/getIndexPage', async (req, res) => {
		const model = await WeAppIndex.findOne()
		res.send(model)
	})
  // 查询热销商品
	router.post('/getHotShop', async (req, res) => {
    // console.log(req.body)
    const itemId = Object.values(req.body)
    let shop = []
    itemId.forEach( async (item) => {
      let a = await Category.findById(item)
      shop.push(a)
      // console.log('a',a)
      // console.log(shop)
    })
    setTimeout(() => {
      res.send(shop)
    }, 1000)
	})
  // 查询全部物品
  router.get('/getAllShop', async (req, res) => {
		const model = await Category.find()
		res.send(model)
	})
  // 获取全部分类
  router.get('/getAllClassify', async (req, res) => {
		const model = await Classify.find()
		res.send(model)
	})
  // 获取全部小料
  router.get('/getExtra', async (req, res) => {
		const model = await Extra.find()
		res.send(model)
	})
  // 保存用户提交的订单
  router.post('/saveOrder', async (req, res) => {
    let item = await Order.find()
    req.body['orderId'] = item.length+1
    console.log(req.body)
    const model = await Order.create(req.body)
		res.send({
			model,
			code: 0,
      msg: '创建成功'
		})
	})
  // 查找用户的订单
  router.post('/getUserOrder', async (req, res) => {
    // console.log(req.body)
    const model = await Order.find(req.body)
		res.send({
			model,
			code: 0,
      msg: '成功'
		})
	})
  // 更新订单状态
  router.post('/changeOrder', async (req, res) => {
    // console.log(req.body)
    const model = await Order.findOneAndUpdate(req.body,{status: 'done'})
    // model.status = 'done'
    // console.log(model)
		res.send({
			model,
			code: 0,
      msg: '成功'
		})
	})
	app.use('/admin/api', router)
}