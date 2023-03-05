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
}

module.exports = new CategoryController()
