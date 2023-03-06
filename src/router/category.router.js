const KoaRouter = require('@koa/router')
const categoryController = require('../controller/category.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const categoryRouter = new KoaRouter({ prefix: '/category' })

categoryRouter.post('/', verifyAuth, categoryController.create)

categoryRouter.get('/', categoryController.list)

module.exports = categoryRouter
