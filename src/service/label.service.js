const connection = require('../app/database')

class LabelService {
  async create(name) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?)`
      const [result] = await connection.execute(statement, [name])
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async list() {
    const statement = `SELECT * FROM label`
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new LabelService()
