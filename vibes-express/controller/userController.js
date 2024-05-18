const { User } = require('../model')
const sendResponse = require('../utils/sendResponse')

// 用户注册
exports.signup = async (req, res) => {
  const userModel = new User(req.body)
  const savedUser = await userModel.save()
  // 把password从响应数据中剔除
  const { password, ...userData } = savedUser.toObject()
  // res.status(201).json(userData)
  sendResponse.success(res, userData, 'Registration Successful!')
}

// 用户登录
exports.signin = async (req, res) => {
  /**
   * 1. 客户端数据验证
   * 2. 链接数据库进行查询
   */
  console.log('req.body', req.body)
  const signinValidate = await User.findOne(req.body)
  if (!signinValidate) {
    sendResponse.error(res, 401, 'Wrong email address or password!')
  }
  sendResponse.success(res, signinValidate, 'Login successful!')
}

exports.watchlists = async (req, res) => {
  console.log(req.method)
  res.send('userList')
}

exports.userDelete = async (req, res) => {}
