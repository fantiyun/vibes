const express = require('express')

const router = express.Router()
router.get('/', (req, res, next) => {
  console.log(req.method)
  res.send('/index')
})

router.get('/signin', (req, res) => {
  console.log(req.method)
  res.send('/signin')
})

module.exports = router
