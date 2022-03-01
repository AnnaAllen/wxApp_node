module.exports = app => {
	const express = require('express')
	const router = express.Router() //这里是express的一个子路由

	const Classify = require('../../models/Classify')
	const Extra = require('../../models/Extra')
  // 创建分类
	router.post('/addClassify', async (req, res) => {
    const data = await Classify.find({classifyName: req.body.classifyName})
    // console.log(data.length)
    if(data.length > 0) {
      res.send({
        message: '已有该分类',
        code: 1
      })
      return
    }
		const model = await Classify.create(req.body)
		res.send({
			model,
			code: 0
		})
	})
  // 查询分类
	router.get('/getClassify', async (req, res) => {
		const model = await Classify.find()
		res.send(model)
	})
  // 删除分类
	router.delete('/addClassify/:id', async (req, res) => {
		await Classify.findByIdAndDelete(req.params.id, req.body)
		res.send({
			success: true,
      code: 0
		})
	})
	// 创建小料
	router.post('/addExtra', async (req, res) => {
    const data = await Extra.find({extraName: req.body.extraName})
    // console.log(data.length)
    if(data.length > 0) {
      res.send({
        message: '已有该分类',
        code: 1
      })
      return
    }
		const model = await Extra.create(req.body)
		res.send({
			model,
			code: 0
		})
	})
	// 查询小料
	router.get('/getExtra', async (req, res) => {
		const model = await Extra.find()
		res.send(model)
	})
	// 删除小料
	router.delete('/getExtra/:id', async (req, res) => {
		await Extra.findByIdAndDelete(req.params.id, req.body)
		res.send({
			success: true,
      code: 0
		})
	})
	// 查询某个小料
	router.get('/editExtra/:id', async (req, res) => {
		const model = await Extra.findById(req.params.id, req.body)
		res.send({
			success: true,
      code: 0,
			model
		})
	})
	// 修改某个小料
	router.put('/changeExtra/:id', async (req, res) => {
		const model = await Extra.findByIdAndUpdate(req.params.id, req.body)
		res.send({
			success: true,
      code: 0,
			model
		})
	})
	app.use('/admin/api', router)
}