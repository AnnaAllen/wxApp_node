module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken') // 安装npm i jsonwebtoken
// 安装assert 简化代码
	const router = express.Router() //这里是express的一个子路由

	const Category = require('../../models/Category')
	const AdminUser = require('../../models/AdminUser')
	
	// 创建菜单
	router.post('/addCategories', async (req, res, next) => {
		const token = req.headers.token
		console.log(token)
		await next()
	}, async (req, res) => {
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
	router.get('/categoriesList', async (req, res, next) => {
		const token = req.headers.token
		const { id } = jwt.verify(token, app.get('secret'))
		const user = await AdminUser.findById(id)
		await next()
	}, async (req, res) => {
		const model = await Category.find()
		res.send(model)
	})
	// 查找一个菜单
	router.get('/categoriesList/:id', async (req, res) => {
		const model = await Category.findById(req.params.id)
		res.send(model)
	})

	// 注册
	router.post('/login', async (req, res) => {
		const a = await AdminUser.find({userName: req.body.userName})
		if(a.length>0) {
			res.send({
				code: 1,
				message: '该用户名已存在'
			})
			return
		}
		const model = await AdminUser.create(req.body)
		res.send({
			model,
			code: 0
		})
	})

	// 登录 register
	router.post('/register', async (req, res) => {
		// 1.根据用户名找到用户
		const user = await AdminUser.findOne({userName: req.body.userName})
		if(!user) {
			return res.status(422).send({
				message: '用户不存在'
			})
		}
		// console.log(user)
		// 2.校验被散列的密码
		const isValid = require('bcrypt').compareSync(req.body.password, user.password)
		if(!isValid) {
			return res.status(422).send({
				message: '密码错误，请输入正确密码'
			})
		}
		// 3.返回token 
		const token = jwt.sign({ id: user._id }, app.get('secret')) // sign()有两个参数，第一个参数是加密的变量，第二个是秘钥
		res.send({
			code:0,
			message: '登录成功',
			token
		})
		// console.log(a)
	})
	// 获取所有管理员信息
	router.get('/getAdmin', async (req,res) => {
		const model = await AdminUser.find()
		res.send({
			model,
			code: 0
		})
	})
	// 获取某个管理员的信息
	router.get('/getAdmin/:id', async (req, res) => {
		const model = await AdminUser.findById(req.params.id)
		res.send({
			model,
			code: 0
		})
	})
	// 编辑管理员信息
	router.put('/editAdmin/:id', async (req, res) => {
		const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
		res.send({
			model,
			code: 0
		})
	})
	// 删除管理员
	router.delete('/getAdmin/:id', async (req, res) => {
		await AdminUser.findByIdAndDelete(req.params.id, req.body)
		res.send({
			success: true
		})
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