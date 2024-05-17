const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const userConttorller = require('../controller/userController')
const validator = require('../middlewear/validator/userValidator')
const errorMiddleware = require('../middlewear/validator/errorMiddleware')

router
  .post(
    '/signup',
    // 验证非空中间件
    validator,
    // errorMiddleware,
    userConttorller.signup
  )

  // .post('/signup', userConttorller.signup)
  .get('/list', userConttorller.userList)
  .delete('/', userConttorller.userDelete)

module.exports = router
