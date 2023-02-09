const app = require('./app')
require('./utils/handle-error')

app.listen(8000, () => {
  console.log('服务器启动成功')
})
