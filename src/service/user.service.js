const connection = require('../app/database')

class UserService {
  async create(user) {
    const { username, password } = user
    const statement = `INSERT INTO user (username, password) VALUES (?, ?)`
    await connection.execute(statement, [username, password])
  }
}

module.exports = new UserService()
