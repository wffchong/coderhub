const connection = require('../app/database')

class CommentService {
  async create(momentId, userId, content) {
    try {
      const statement = `INSERT INTO comment (moment_id, user_id, content) VALUES (?, ?, ?)`
      const [result] = await connection.execute(statement, [momentId, userId, content])
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = new CommentService()
