const { body } = require('express-validator')
const validator = require('./errorMiddleware')
const { User } = require('../../model/index')
const errMsg = require('../config')

// 注册校验
module.exports.signup = validator([
  body('username')
    .notEmpty()
    .withMessage(errMsg.required('username'))
    .bail() // 验证不通过则停止执行，解决出现两个返回 error message 的问题
    .isLength({ max: 70 })
    .withMessage(errMsg.maxLength('email', 70))
    .bail(),

  body('email')
    .notEmpty()
    .withMessage(errMsg.required('email'))
    .bail()
    .isEmail()
    .withMessage(errMsg.invalidFormat('email'))
    .bail()
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email })
      if (emailValidate) {
        return Promise.reject(
          errMsg.alreadyRegistered('email', emailValidate.email)
        )
      }
    })
    .bail(),

  body('password')
    .notEmpty()
    .withMessage(errMsg.required('password'))
    .bail()
    .isLength({ min: 6 })
    .withMessage(errMsg.minLength('password', 6))
    .bail(),

  body('phoneNumber')
    .notEmpty()
    .withMessage(errMsg.required('phoneNumber'))
    .bail()
    .isMobilePhone()
    .withMessage(errMsg.invalidFormat('phoneNumber'))
    .bail()
    .custom(async (phoneNumber) => {
      const phoneNumberValidate = await User.findOne({ phoneNumber })
      if (phoneNumberValidate) {
        return Promise.reject(
          errMsg.alreadyRegistered(
            'phoneNumber',
            phoneNumberValidate.phoneNumber
          )
        )
      }
    })
    .bail(),
])

// 登录校验
module.exports.signin = validator([
  body('email')
    .notEmpty()
    .withMessage(errMsg.required('email'))
    .bail()
    .isEmail()
    .withMessage(errMsg.invalidFormat('email'))
    .bail()
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email })
      if (!emailValidate) {
        return Promise.reject(
          errMsg.notRegistered('email', emailValidate.email)
        )
      }
    })
    .bail(),

  body('password').notEmpty().withMessage(errMsg.required('password')).bail(),
])

// 更新校验
module.exports.update = validator([
  body('email')
    .custom(async (email) => {
      const foundEmail = await User.findOne({ email })
      if (foundEmail) {
        return Promise.reject(
          errMsg.alreadyRegistered('email', foundEmail.email)
        )
      }
    })
    .bail(),

  body('phoneNumber')
    .custom(async (phoneNumber) => {
      const foundPhoneNumber = await User.findOne({ phoneNumber })
      if (foundPhoneNumber) {
        return Promise.reject(
          errMsg.alreadyRegistered('phoneNumber', foundPhoneNumber.phoneNumber)
        )
      }
    })
    .bail(),
])
