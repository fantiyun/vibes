const { validationResult } = require('express-validator')

module.exports = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validate) => validate.run(req)))
    const err = validationResult(req)
    if (!err.isEmpty()) return res.status(401).json({ error: err.array()[0] })
    next()
  }
}
