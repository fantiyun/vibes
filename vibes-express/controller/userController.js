const { User } = require('../model')
const sendResponse = require('../utils/sendResponse')
const { createToken } = require('../utils/jwt')

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
  // 链接数据库进行查询
  let signinValidate = await User.findOne(req.body)
  if (!signinValidate) {
    sendResponse.error(res, 401, 'Wrong email address or password!')
  } else {
    // 生成 token, 将 token 和查到的用户信息一并返回给客户端
    // signinValidate = signinValidate.toJSON()
    // signinValidate.token = jwt.sign(
    //   { signinValidate },
    //   '8eceea83-cbf8-4829-b28d-1e56613182b1'
    // )
    // 封装 jwt 实现
    signinValidate = signinValidate.toJSON()
    signinValidate.token = await createToken(signinValidate)
    sendResponse.success(res, signinValidate, 'Login successful!')
  }
}

exports.watchlists = async (req, res) => {
  console.log(req.user)
  res.send(req.user)
}

exports.userDelete = async (req, res) => {}
