const { CATEGORY_IS_EXISTS } = require('../config/error')
const categoryService = require('../service/category.service')

class CategoryController {
  async create(ctx) {
    const { name } = ctx.request.body
    try {
      await categoryService.create(name)

      ctx.body = {
        code: 0,
        message: '添加分类成功',
        data: null
      }
    } catch (error) {
      return ctx.app.emit('error', CATEGORY_IS_EXISTS, ctx)
    }
  }
  async list(ctx) {
    const result = await categoryService.list()

    ctx.body = {
      code: 0,
      message: '获取分类成功',
      data: result
    }
  }
}

module.exports = new CategoryController()
