const KoaRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { handleAvatar, handlePicture } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)

fileRouter.get('/getUploadToken', verifyAuth, fileController.getUploadToken)

module.exports = fileRouter
