const connection = require('../app/database')

class MomentService {
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async queryList(offset = 0, size = 10) {
    const statement = `SELECT * FROM moment LIMIT ? OFFSET ?`
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }
}

module.exports = new MomentService()
