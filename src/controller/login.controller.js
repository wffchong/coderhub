const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')

class LoginController {
  sign(ctx, next) {
    const { username, id, mobile, avatar_url } = ctx.user
    // 颁发令牌
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    ctx.body = {
      code: 0,
      message: '登录成功',
      data: {
        username,
        token,
        mobile,
        avatarUrl: avatar_url
      }
    }
  }

  test(ctx, next) {
    ctx.body = 'test'
  }
}

module.exports = new LoginController()
