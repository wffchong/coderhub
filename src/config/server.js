const dotenv = require('dotenv')

dotenv.config()

const { SERVER_PORT, SERVER_HOST } = process.env

module.exports = {
  SERVER_PORT,
  SERVER_HOST
}
