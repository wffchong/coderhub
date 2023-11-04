const connection = require('../app/database')
const qiniu = require('qiniu') // 需要加载qiniu模块的
const QI_NIU_CONFIG = require('../config/qiniu')

class FileService {
  async create(filename, mimetype, size, userId) {
    const statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async createPicture(filename, mimetype, size, userId) {
    const statement = 'INSERT INTO file (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async queryAvatarWithUserId(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?'
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }

  async uploadToQiniu(filePath, key) {
    const accessKey = QI_NIU_CONFIG.accessKey
    const secretKey = QI_NIU_CONFIG.secretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // 上传凭证
    const options = {
      scope: QI_NIU_CONFIG.bucket,
      expires: 7200 // 2小时 --> 默认一小时
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    // Zone_z0 华东机房  Zone_z1 华北机房  Zone_z2 华南机房   Zone_na0 北美
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2

    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    return new Promise((resolved, reject) => {
      formUploader.putStream(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr)
        } else {
          console.log('respBody', respBody)
          //  返回的是key:文件名和hash:文件信息
          // "hash": "XXX",
          // "key": "public/b59b7a70-d686-11ec-bed9-1fde74428146.jpg"
          resolved(respBody)
        }
      })
    })
  }
}

module.exports = new FileService()
