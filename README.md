# vibes

## MongoDB 数据持久化存储

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

8. 总结回顾

- 安装 MongoDB
