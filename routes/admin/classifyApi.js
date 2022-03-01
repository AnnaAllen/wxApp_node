module.exports = app => {
	const express = require('express')
	const router = express.Router() //这里是express的一个子路由

	const Classify = require('../../models/Classify')
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
	app.use('/admin/api', router)
}