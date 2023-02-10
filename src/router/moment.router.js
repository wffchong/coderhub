const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const verifyPermission = require('../middleware/permission.middleware')
const momentRouter = new KoaRouter({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, momentController.create)

momentRouter.get('/', momentController.list)

momentRouter.get('/:momentId', momentController.detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)

momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)

module.exports = momentRouter
