const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017')

const handleClient = async (collectionName) => {
  await client.connect()
  const database = client.db('vibes')
  return database.collection(collectionName)
}

const main = async () => {
  const users = await handleClient('users')
  //   const searchData = await users.find({ age: { $gt: 18 } })
  //   console.log('searchData', await searchData.toArray())

  //   添加一条数据
  //   const insertData = await users.insertOne({ username: 'monica', age: 18 })
  //   console.log('insertData', insertData)

  //   添加多条数据
  //   await readFile('./fixtures/db.json', 'utf8', async (err, data) => {
  //     const insertedData = await users.insertMany(JSON.parse(data))
  //     console.log(insertedData)
  //   })

  //   查询一条
  //   const userinfo = await users.findOne({ age: { $gt: 18 } })
  //   console.log('userinfo', userinfo)

  //   查询多条
  //   const userinfo = await users.find({ age: { $gt: 18 } })
  //   console.log('userinfo', await userinfo.toArray())

  //   更新一条
  //   const userinfo = await users.updateOne(
  //     { age: 18 },
  //     { $set: { username: 'fantiyun' } }
  //   )
  //   console.log('userinfo', userinfo)

  //   更新多条
  //   const userinfo = await users.updateMany(
  //     { age: 20 },
  //     { $set: { username: 'update-name' } }
  //   )
  //   console.log('userinfo', userinfo)

  //   删除一条
  //   const deleted = await users.deleteOne({ username: 'fantiyun' })
  //   删除多条
  const deletedAll = await users.deleteMany({ age: { $lt: 100 } })
  console.log(deletedAll)
}

main().finally(() => client.close())
