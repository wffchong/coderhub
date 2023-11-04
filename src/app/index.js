const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new Koa()

// 处理post请求参数
app.use(bodyParser())
registerRouters(app)

module.exports = app
