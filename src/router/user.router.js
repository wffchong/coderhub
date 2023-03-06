const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, userController.create)

userRouter.get('/avatar/:userId', userController.showAvatarImage)

userRouter.post('/smsCode', (ctx, next) => {
  console.log('ctx.request.body', ctx.request.body)
})

userRouter.post('/phoneLogin', (ctx, next) => {})

module.exports = userRouter
