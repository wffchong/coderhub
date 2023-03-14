const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  PASSWORD_IS_INCORRECT,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZATION
} = require('../config/error')
const { PUBLIC_KEY } = require('../config/secret')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  const users = await userService.findUserByName(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }

  console.log('user', user)
  // 将用户信息保存下来
  ctx.user = user

  await next()
}

// 验证是否携带了正确的token
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

  try {
    // 验证token是否正确
    const token = authorization.replace('Bearer ', '')
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    ctx.user = result
    await next()
  } catch (error) {
    console.log('error', error)
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
