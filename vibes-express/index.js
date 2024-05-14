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
  await readFile('./fixtures/db.json', 'utf8', async (err, data) => {
    const insertedData = await users.insertMany(JSON.parse(data))
    console.log(insertedData)
  })
}

main().finally(() => client.close())
