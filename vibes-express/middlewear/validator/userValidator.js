const { body } = require('express-validator')
const validator = require('./errorMiddleware')
const { User } = require('../../model/index')

module.exports.signup = validator([
  body('username')
    .notEmpty()
    .withMessage('username is required!')
    .bail() // 验证不通过则停止执行，解决出现两个返回 error message 的问题
    .isLength({ max: 70 })
    .withMessage('The username must not be longer than 70')
    .bail(),

  body('email')
    .notEmpty()
    .withMessage('email is required!')
    .bail()
    .isEmail()
    .withMessage('The email format is not compliant')
    .bail()
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email })
      if (emailValidate) {
        return Promise.reject(`Email ${email} has been registered!`)
      }
    })
    .bail(),

  body('password')
    .notEmpty()
    .withMessage('password is required!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('The length of the password cannot be less than 6 characters')
    .bail(),

  body('phoneNumber')
    .notEmpty()
    .withMessage('Mobile phone number is required!')
    .bail()
    .isMobilePhone()
    .withMessage('The mobile phone number format is not compliant')
    .bail()
    .custom(async (phoneNumber) => {
      const phoneNumberValidate = await User.findOne({ phoneNumber })
      if (phoneNumberValidate) {
        return Promise.reject(
          `Mobile phone number ${phoneNumber} has been registered!`
        )
      }
    })
    .bail(),
])

module.exports.signin = validator([
  body('email')
    .notEmpty()
    .withMessage('email is required!')
    .bail()
    .isEmail()
    .withMessage('The email format is not compliant')
    .bail(),

  body('password').notEmpty().withMessage('password is required!').bail(),
])
