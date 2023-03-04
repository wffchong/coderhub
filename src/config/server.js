const dotenv = require('dotenv')

dotenv.config()

const { SERVER_PORT, SERVER_HOST, SQL_PORT, SQL_HOST, SQL_DATA_BASE, SQL_USER, SQL_PASSWORD, SQL_CONNECTION_LIMIT } =
  process.env

module.exports = {
  SERVER_PORT,
  SERVER_HOST,
  SQL_HOST,
  SQL_PORT,
  SQL_DATA_BASE,
  SQL_USER,
  SQL_PASSWORD,
  SQL_CONNECTION_LIMIT
}
