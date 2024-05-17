const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const userConttorller = require('../controller/userController')
const validator = require('../middlewear/validator/userValidator')

router
  .post(
    '/signup',
    // 验证非空中间件
    validator,
    // 验证结果需要在下一个中间件中打印，会把所有的验证的结果写到 req 中
    (req, res, next) => {
      const err = validationResult(req)
      if (!err.isEmpty()) return res.status(401).json({ error: err.array()[0] })
      next()
    },
    userConttorller.signup
  )

  // .post('/signup', userConttorller.signup)
  .get('/list', userConttorller.userList)
  .delete('/', userConttorller.userDelete)

module.exports = router
