const { User } = require('../model')

// 用户注册
exports.signup = async (req, res) => {
  const userModel = new User(req.body)
  const savedUser = await userModel.save()
  // 把password从响应数据中剔除
  const { password, ...userData } = savedUser.toObject()
  res.status(201).json(userData)
}

exports.userList = async (req, res) => {
  console.log(req.method)
  res.send('userList')
}

exports.userDelete = async (req, res) => {}
