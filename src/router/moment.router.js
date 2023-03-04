const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const verifyPermission = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')
const momentRouter = new KoaRouter({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, momentController.create)

momentRouter.get('/', momentController.list)

// 获取最后 n 条动态
momentRouter.get('/last/:num', momentController.lastList)

momentRouter.get('/:momentId', momentController.detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)

momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)

module.exports = momentRouter
