const fs = require('fs')

const registerRouters = app => {
  // 读取当前文件夹下面的所有文件
  const files = fs.readdirSync(__dirname)

  for (const file of files) {
    if(file.includes('router')) {
      const router = require(`./${file}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }
}

module.exports = registerRouters
