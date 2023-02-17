const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')

class FileController {
  async create(ctx) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 将图片信息和id结合起来进行存储
    await fileService.create(filename, mimetype, size, id)

    // 将头像的地址信息, 保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    await userService.updateUserAvatar(avatarUrl, id)

    ctx.body = {
      code: 0,
      message: '上传头像成功',
      data: null
    }
  }
}

module.exports = new FileController()
