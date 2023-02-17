const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path')
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

  async showAvatarImage(ctx) {
    const { userId } = ctx.params
    // 获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    console.log('avatarInfo', avatarInfo)
    // 读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
