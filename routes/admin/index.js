module.exports = app => {
	const express = require('express')
	const router = express.Router() //这里是express的一个子路由

	const Category = require('../../models/Category')
	
	// 创建菜单
	router.post('/addCategories', async (req, res) => {
		const model = await Category.create(req.body)
		res.send(model)
	})
	// 编辑菜单
	router.put('/addCategories/:id', async (req, res) => {
		const model = await Category.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})
	// 删除菜单
	router.delete('/addCategories/:id', async (req, res) => {
		await Category.findByIdAndDelete(req.params.id, req.body)
		res.send({
			success: true
		})
	})
	// 查找全部菜单
	router.get('/categoriesList', async (req, res) => {
		const model = await Category.find()
		res.send(model)
	})
	// 查找一个菜单
	router.get('/categoriesList/:id', async (req, res) => {
		const model = await Category.findById(req.params.id)
		res.send(model)
	})

	app.use('/admin/api', router)

	// 上传图片
	/*
	1. 引入新的中间件：npm i multer
	2. 设置文件相对地址：dest: __dirname + '../../uploads'
	3. 在req中增加file属性：upload.single('file')
	 */
	const multer = require('multer')
	const upload = multer({
		dest: __dirname + '../../../uploads'
	}) 
	app.post('/admin/api/uploads', upload.single('file') ,async (req,res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})
}