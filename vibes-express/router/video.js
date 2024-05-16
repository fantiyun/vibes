const express = require('express')

const routerVideo = express.Router()
routerVideo.get('/', (req, res, next) => {
  console.log(req.method)
  res.send('/index')
})

routerVideo.get('/signin', (req, res) => {
  console.log(req.method)
  res.send('/signin')
})

module.exports = routerVideo
