const { LABEL_IS_EXISTS } = require('../config/error')
const labelService = require('../service/label.service')

class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body
    try {
      await labelService.create(name)
      ctx.body = {
        code: 0,
        message: '新增成功',
        data: null
      }
    } catch (error) {
      return ctx.app.emit('error', LABEL_IS_EXISTS, ctx)
    }
  }

  async list(ctx) {
    const result = await labelService.list()
    ctx.body = {
      code: 0,
      message: '获取成功',
      data: {
        list: result
      }
    }
  }
}

module.exports = new LabelController()
