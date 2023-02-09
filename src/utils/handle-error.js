const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  PASSWORD_IS_INCORRECT,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZATION
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已存在，请重新输入'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在，请重新输入'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '密码错误，请重新输入'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token或者token已过期'
      break
    default:
      code = -3000
      message = '未知错误，请检查'
  }

  ctx.body = {
    code,
    message
  }
})
