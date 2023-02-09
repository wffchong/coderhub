const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body

    await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '创建用户动态成功~',
      data: null
    }
  }
}

module.exports = new MomentController()
