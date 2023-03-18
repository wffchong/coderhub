const qiniu = require('qiniu')

const ACCESS_KEY = 'tCt8pSxOS5WjepYmaK0B6RdBBf_lrbpRpkJMWEnM'
const SECRET_KEY = '9RGOw1FioDbdRIt5-4nOogJQVt0RNqB9Ls_-nCvY'
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
const BUCKET = 'picture-wff'

const options = {
  scope: BUCKET,
  expires: 60 * 60 * 2
}

const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}
