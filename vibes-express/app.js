const express = require('express')
const router = require('./router')
const routerVideo = require('./router/video')
const app = express()
const PORT = process.env.PORT || 3000

//挂载路由
app.use('/api', router)
app.use('/video', routerVideo)

// //挂载统一处理服务端错误中间件
// app.use(errorHandler())

// /user/1/video/2，/:[参数名称不能重复]
app.get('/api/user/:id/video/:vid', (req, res) => {
  // 资源响应
  res.download() // 需要下载的资源
  res.json() // 将数组或对象转为json
  res.redirect() // 重定向
  res.render() // 渲染静态模板
  res.status() // 响应状态码
  res.send() //
  res.sendStatus() // 相应状态码和数据
  res.end() // 结束响应

  //   这些方法都可以用于链式调佣
  res.download().status(200).josn({ name: 'abc' })
})

// 路由链式调用
app.get('/user', (req, res) => {}).post('/ps', (req, res) => {})

// 路由级别
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
