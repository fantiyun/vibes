const express = require('express')
const videoController = require('../controller/videoController')

const router = express.Router()

router.get('/videoList', videoController.videoList)

module.exports = router
