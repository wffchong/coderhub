const connection = require("../app/database")

class PermissionService {
  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE user_id = ? AND id = ?`

    const [result] = await connection.execute(statement, [userId, resourceId])
    return !!result.length
  }
}

module.exports = new PermissionService()
