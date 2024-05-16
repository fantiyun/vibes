# vibes

## 一、MongoDB 数据持久化存储

1. MongoDB 是什么？

   - 一个基于文件存储的分布式 NoSQL 数据库系统
   - 数据结构由键值对（key, value）组成
   - 拥有非常强大的查询能力
     1. 单表查询
     2. 范围查询
     3. 聚合等等

2. 有哪些特性？

   - 文档型数据库，较强可扩展性，拥有强大的查询语言，多种存储引擎
   - 高性能、高可用、水平扩展：支持数据嵌入，子文档查询、支持副本集与分片
   - 多种查询类型支持，且支持数据聚合查询、文本检索、地址位置查询

3. 使用场景有哪些？

   - 对数据处理性能有较高要求
   - 需要借助于缓存层来处理数据
   - 需要高度的伸缩性

4. 安装 mongodb

   - `brew tap mongodb/brew` 首先需要添加 MongoDB 的 Homebrew 仓库
   - `brew install mongodb-community@6.0` 然后执行以下命令安装最新版的 MongoDB 社区版
   - `brew services start mongodb-community` 启动 MongoDB 服务
   - `mongo` 在终端中运行以下命令连接 MongoDB 服务

5. Mongo Shell 执行环境

   - show dbs 查看 Mongo 中所有库
   - use [admin] 切换数据库，如果 admin 不存在，则创建一个名为 admin 的数据库(数据库名称最好使用小写形式)
   - db 查看当前所在数据库
   - db.[databaseName].insert({foo: 1}) 向指定库中插入数据
   - db.dropDatabase() 删除数据库操作，删除时所处位置必须是当前删除库（自杀行为）

6. MongoDB 的基础概念

   - 数据存储结构及存储库
   - 集合
   - 文档

   ```json
       // 类似json的结构
       data: { // 数据存储结构及存储库
           foo: [ // 集合
               { // 文档
                   bar: 'bar'
               }
           ]
       }
   ```

7. MongoDB 基本增删改查操作

- 增:

  1. 增加一条 `db.[databaseName].insertOne({username: 'zhangsan', age: 12})`
  2. 增加多条 `db.[databaseName].insertMany([{username: 'zhangsan', age: 12}, {username: 'lisi', age: 18}])`

- 查：

  1. 查询指定条件或全部 `db.[databaseName].find() find(编写查找的条件，如果为空则查找全部||{username: 'lisi'}|| {age: {$gt: 15}})`
  2. 查询符合条件的第一条 `db.[databaseName].findOne({age: {$gt: 15}})`

- 改

  1. 更新一条 `db.[databaseName].updateOne({username: 'zhangsan'}, { $set: {age: 20})`
  2. 更新多条 `db.[databaseName].updateMany({age: {$gt: 16}}, {$set: {username: 'wangwu'}})`

- 删
  1. 删除一条 `db.[databaseName].deleteOne({age: 16})`
  2. 删除多条 `db.[databaseName].deleteMany({age: 16})`

8. 请求响应方法

- res.download() // 需要下载的资源
- res.json() // 将数组或对象转为 json
- res.redirect() // 重定向
- res.render() // 渲染静态模板
- res.status() // 响应状态码
- res.send() //
- res.sendStatus() // 相应状态码和数据
- res.end() // 结束响应

// 这些方法都可以用于链式调佣
res.download().status(200).josn({ name: 'abc' })

- 安装 MongoDB

## 二、Node - Express 中间件与接口规范

1. Express 中间件是什么？
   在正常的工作流程中，添加一个额外的处理环节，这个环节不会对整体的工作流程造成影响

2. Express 中间件分类

- 应用程序级别中间件

  ```javascript
  // 语法
  const app = express()

  app.use((req, res, next) => {})

  // 处理请求打印日志
  app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}, ${Date.now()}`)
    next()
  })

  // 限定请求方法的中间件
  app.get('/user', (req, res, next) => {})

  // 进一步的请求处理
  app.get(
    '/user',
    (req, res, next) => {
      console.log(req.method)
      next()
    },
    (req, res, next) => {
      console.log('进一步的请求处理')
      next()
    },
    (req, res) => {
      console.log('再一步的请求处理')
      res.send()
    }
  )
  ```

- 路由级别中间件

  ```javascript
  // app.js
  const express = require('express')
  const router = require('./router')
  const routerVideo = require('./router/video')
  const app = express()
  const PORT = process.env.PORT || 3000
  //挂载路由
  app.use('/api', router)
  app.use('/video', routerVideo)

  // 路由级别
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })

  // router/index.js
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

  // router/video.js
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

  // /user/1/video/2，/:[参数名称不能重复]
  app.get('/api/user/:id/video/:vid', (req, res) => {
    console.log(req.params)
    res.send(`${req.method}---${req.url}`)
  })

  // 路由链式调用
  app.get('/user', (req, res) => {}).post('/ps', (req, res) => {})
  ```

- 错误处理中间件
- 内置中间件
- 三方中间件

```

```
