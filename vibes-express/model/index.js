const mongoose = require('mongoose')
const userSchema = require('./userSchema')

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/vibes')
}
main()
  .then(() => {
    console.log('The mongoDB link was successful')
  })
  .catch((err) => {
    console.log('MongoDB link failed', err)
  })

module.exports = {
  // 创建集合
  User: mongoose.model('User', userSchema),
}

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: Number,
//     required: false,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// })
// // 创建集合
// const userModel = mongoose.model('User', userSchema)
// // 新增数据
// const um = new userModel({
//   username: 'zhangsan',
//   email: 'zhangsan@vibes.com',
//   password: 'zhangsan',
// })
// // 保存数据
// um.save()
