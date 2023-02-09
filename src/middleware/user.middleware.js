const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 非空验证
  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 验证用户名是否存在
  const users = await userService.findUserByName(username)

  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }
  await next()
}

// 加密密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
