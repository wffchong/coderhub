const qiniu = require('qiniu')

const accessKey = 'tCt8pSxOS5WjepYmaK0B6RdBBf_lrbpRpkJMWEnM'
const secretKey = '9RGOw1FioDbdRIt5-4nOogJQVt0RNqB9Ls_-nCvY'
const bucket = 'picture-wff'
const origin = 'qiniuyun-pictures.wangff.top' //配置的域名

const QI_NIU = {
  accessKey,
  secretKey,
  bucket,
  origin
}

module.exports = QI_NIU