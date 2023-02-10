const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const permissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  const { id: userId } = ctx.user

  const keyName = Object.keys(ctx.params)[0]
  // 动态获取表名
  const resourceName = keyName.replace('Id', '')
  const resourceId = ctx.params[keyName]
  const result = await permissionService.checkResource(resourceName, resourceId, userId)

  if (!result) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = verifyPermission
