module.exports = (req) => {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`)
}
// 使用如下代码替代
// app.use((req, res) => {
//   console.log(`${req.method}, ${req.url}, ${Date.now()}`)
// })
