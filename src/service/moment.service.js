const connection = require('../app/database')

class MomentService {
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async queryList(offset = 0, size = 10) {
    const statement = `
      SELECT m.id AS id, m.content as content, m.createAt AS createTime, m.updateAt AS updateTime,
      JSON_OBJECT('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment AS m
      LEFT JOIN user AS u ON u.id = m.user_id
      LIMIT ? OFFSET ?
    `
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }

  async queryById(id) {
    const statement = `
      SELECT m.id AS id, m.content as content, m.createAt AS createTime, m.updateAt AS updateTime,
      JSON_OBJECT('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment AS m
      LEFT JOIN user AS u ON u.id = m.user_id
      WHERE m.id = ?
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new MomentService()
