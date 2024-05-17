const { body } = require('express-validator')
const validator = require('./errorMiddleware')

module.exports = signup = validator([
  body('username')
    .notEmpty()
    .withMessage('username is required!')
    .bail() // 验证不通过则停止执行，解决出现两个返回 error message 的问题
    .isLength({ max: 70 })
    .withMessage('The username must not be longer than 70'),
  body('email')
    .notEmpty()
    .withMessage('email is required!')
    .bail()
    .isEmail()
    .withMessage('The email format is not compliant'),
  body('password')
    .notEmpty()
    .withMessage('password is required!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('The length of the password cannot be less than 6 characters'),
])
