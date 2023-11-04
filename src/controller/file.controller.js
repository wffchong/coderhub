const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
const QI_NIU_CONFIG = require('../config/qiniu')
const { UPLOAD_FILE_ERROR } = require('../config/error')
const uuid = require('uuid')
const fs = require('fs')

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

  async createPicture(ctx) {
    console.log('ctx', ctx.request.file)
    let params = ctx.request.body // 获取formData文本信息
    let file = ctx.request.file // 获取formData文件信息
    console.log('params', params)
    if (file) {
      // 文件名
      const fileName = uuid.v1()
      // 创建文件可读流
      const reader = fs.createReadStream(file.path)
      // 获取上传文件扩展名
      const ext = file.originalname.split('.').pop()
      // 命名文件以及拓展名
      const fileUrl = `public/${fileName}.${ext}`
      //  上传文件到七牛并返回七牛文件目录
      const result = await fileService.uploadToQiniu(reader, fileUrl)
      if (result) {
        ctx.body = {
          code: 0,
          message: '上传成功',
          data: {
            url: `https:${QI_NIU_CONFIG.origin}/${result.key}` // 获取上传文件 使用 （七牛配置域名+imgUrl）
          }
        }
      } else {
        return ctx.app.emit('error', UPLOAD_FILE_ERROR, ctx)
      }
    }
  }
}

module.exports = new FileController()
