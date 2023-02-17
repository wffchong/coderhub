const labelService = require('../service/label.service')
const momentService = require('../service/moment.service')

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  for (const labelName of labels) {
    const labelObj = { name: labelName }
    const result = await labelService.queryLabelByName(labelName)
    if (!result) {
      const res = await labelService.create(labelName)
      labelObj.id = res.insertId
    } else {
      labelObj.id = result.id
    }
    newLabels.push(labelObj)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}
