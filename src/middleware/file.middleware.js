const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const uploadAvatar = multer({
  dest: UPLOAD_PATH
})

const handleAvatar = uploadAvatar.single('avatar')

const handlePicture = uploadAvatar.single('picture')

module.exports = { handleAvatar, handlePicture }
