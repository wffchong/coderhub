const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body

    await userService.create(user)

    ctx.body = {
      code: 0,
      message: '创建用户成功',
      data: null
    }
  }
}

module.exports = new UserController()
