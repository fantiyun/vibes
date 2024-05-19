const { User } = require('../model')
const sendResponse = require('../utils/sendResponse')
const { createToken, verifyToken } = require('../utils/jwt')

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
  console.log('signinValidate', signinValidate)
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
// 关注列表
exports.watchlists = async (req, res) => {
  res.send(req.user)
}
// 更新用户信息
exports.update = async (req, res) => {
  // const updatedData = await User.updateOne(
  //   { _id: req.user._id },
  //   { $set: { ...req.body } }
  // )

  // 默认返回的是修改前的数据，可以配置 {new: true} 表示更新后的数据
  const updatedData = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  })

  sendResponse.success(res, updatedData)
}

exports.userDelete = async (req, res) => {
  const foundUser = await User.findOne(req.body)
  consle.log(foundUser)
}
