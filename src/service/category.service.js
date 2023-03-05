const connection = require('../app/database')

class CategoryService {
  async create(categoryName) {
    try {
      const statement = `INSERT INTO category (name) VALUES (?)`
      const [result] = await connection.execute(statement, [categoryName])
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = new CategoryService()
