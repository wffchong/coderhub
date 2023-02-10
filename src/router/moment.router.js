const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const momentRouter = new KoaRouter({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, momentController.create)

momentRouter.get('/', momentController.list)

momentRouter.get('/:momentId', momentController.detail)

module.exports = momentRouter
