const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id: userId } = ctx.user

    try {
      await commentService.create(momentId, userId, content)

      ctx.body = {
        code: 0,
        message: '评论成功',
        data: null
      }
    } catch (error) {
      return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }
  }
}

module.exports = new CommentController()
