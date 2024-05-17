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
  },
  avatar: {
    type: String,
    default: null,
  },
  ...baseSchema,
})

module.exports = userSchema
