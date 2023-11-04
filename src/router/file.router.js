const KoaRouter = require('@koa/router')
const { uploadToken } = require('../config/qiniu')
const fileController = require('../controller/file.controller')
const { handleAvatar, handlePicture } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)

fileRouter.post('/picture', verifyAuth, handlePicture, fileController.createPicture)

module.exports = fileRouter
