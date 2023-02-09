const KoaRouter = require('@koa/router')
const { verifyLogin } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, (ctx, next) => {
  ctx.body = '登录'
})

module.exports = loginRouter
