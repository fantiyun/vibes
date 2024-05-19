const express = require('express')
const router = express.Router()
const userContorller = require('../controller/userController')
const validator = require('../middlewear/validator/userValidator')
const { verifyToken } = require('../utils/jwt')

router
  // validator: 非空验证
  .post('/signup', validator.signup, userContorller.signup)
  .post('/signin', validator.signin, userContorller.signin)

  .get('/watchlists', verifyToken, userContorller.watchlists)
  .put('/update', verifyToken, validator.update, userContorller.update)
  .delete('/', userContorller.userDelete)

module.exports = router
