const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express()

// 设置请求内容解析格式(restfulapi 规范)
app.use(express.json())
// 处理跨域
app.use(cors())
// 日志记录
app.use(morgan('dev'))
// 应用路由
app.use('/api/v1', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
