const KoaRouter = require('@koa/router')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = '登录'
})

module.exports = loginRouter
