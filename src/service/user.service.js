const connection = require('../app/database')

class UserService {
  async create(user) {
    const { username, password } = user
    const statement = `INSERT INTO user (username, password) VALUES (?, ?)`
    await connection.execute(statement, [username, password])
  }

  async findUserByName(username) {
    const statement = `SELECT * FROM user WHERE username = ?`
    const [result] = await connection.execute(statement, [username])
    return result
  }

  async updateUserAvatar(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
