const KoaRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { handleAvatar } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)

module.exports = fileRouter
