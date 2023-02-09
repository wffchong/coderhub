const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')

const app = new Koa()

// 处理post请求参数
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app