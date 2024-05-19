const mongoose = require('mongoose')
const md5 = require('../utils/md5')
const baseSchema = require('./baseSchema')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (val) => md5(val), // 使用 md5 把密码加密
    select: false, // 查询时将该参数剔除
  },
  avatar: {
    type: String,
    default: null,
  },
  //频道封面
  cover: {
    type: String,
    default: null,
  },
  // 频道描述
  channelDes: {
    type: String,
    default: null,
  },
  ...baseSchema,
})

module.exports = userSchema
