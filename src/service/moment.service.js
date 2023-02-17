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
      JSON_OBJECT('id', u.id, 'username', u.username) AS author,
      (SELECT COUNT(*) FROM comment AS c WHERE m.id = c.moment_id) AS commentCount,
      (SELECT COUNT(*) FROM moment_label AS ml WHERE m.id = ml.moment_id) AS labelCount
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

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, momentId])

    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])

    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result[0] ? true : false
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()
