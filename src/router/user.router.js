const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, userController.create)

userRouter.get('/avatar/:userId', userController.showAvatarImage)

module.exports = userRouter
