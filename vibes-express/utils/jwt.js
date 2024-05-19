const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { secret } = require('../config/config.default')
const sendResponse = require('./sendResponse')

const jwtSign = promisify(jwt.sign)
const jwtVerify = promisify(jwt.verify)

// 创建 token
module.exports.createToken = async (data) => {
  return await jwtSign(data, secret, {
    expiresIn: '7d', // 过期时间
  })
}

// 验证 token，因为需要在每个请求中做验证，所以这里把验证 token 的方法写成中间件的方式
module.exports.verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  token = token?.split(' ')[1] || null

  if (!token) {
    sendResponse.error(res, 401, 'The user is not authenticated')
  }
  try {
    const data = await jwtVerify(token, secret)
    req.user = data
    next()
  } catch (error) {
    sendResponse.error(res, 401, 'Invalid token!')
  }
}
