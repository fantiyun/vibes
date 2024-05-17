const { validationResult } = require('express-validator')

module.exports = (validator) => {
  // 验证结果需要在下一个中间件中打印，会把所有的验证的结果写到 req 中
  return async (req, res, next) => {
    await Promise.all(validator.map((validate) => validate.run(req)))
    const err = validationResult(req)
    if (!err.isEmpty()) return res.status(401).json({ error: err.array() })
    next()
  }
}
