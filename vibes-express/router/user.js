const express = require('express')
const router = express.Router()
const userContorller = require('../controller/userController')
const validator = require('../middlewear/validator/userValidator')

router
  // validator: 非空验证
  .post('/signup', validator.signup, userContorller.signup)
  .post('/signin', validator.signin, userContorller.signin)

  .get('/watchlists', userContorller.watchlists)
  .delete('/', userContorller.userDelete)

module.exports = router
