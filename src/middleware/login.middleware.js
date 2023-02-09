const { NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_INCORRECT, NAME_IS_NOT_EXISTS } = require('../config/error')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')

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
  await next()
}

module.exports = {
  verifyLogin
}
