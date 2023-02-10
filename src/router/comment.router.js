const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, commentController.create)

commentRouter.post('/replay', verifyAuth, commentController.replay)

module.exports = commentRouter
