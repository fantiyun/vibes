#  短视频管理服务

## 一、服务功能介绍
1. 用户（频道）系统
   - 登录
   - 注册
   - 个人中心
   - 个人资料管理
2. 视频系统
    - 视频上传
    - 视频管理（修改名称、描述等）
    - 视频热门推荐
3. 交互系统
   - 点赞
   - 收藏
   - 关注频道
   - 提供自己的频道供别人关注


## 二、服务逻辑导图
- [Project-Prchitecture-Map.mmd](Project-Prchitecture-Map.mmd)


## 三、Node 实现服务器逻辑梳理
1. 使用 Node 创建一个 HTTP 的服务器，并能能够接受到客户端发来的请求
2. 获取到客户端具体的请求数据，并根据不同的请求数据进行处理
3. 将处理之后的结果，响应到客户端，并断开本次链接


## 四、Node 基础知识
### 1. 创建 HTTP 服务
```javascript
// 1.导入 http 模块
const http = require('http')
// 2.创建服务器( createServer() 获取到服务器的实例对象)
const server = http.createServer()
// 3.设置服务监听端口
server.listen(8080, () => {
   console.log('http://127.0.0.1:8080')
})
// 4.接收客户端请求
server.on('request', (req, res) => {
   // 5.响应请求
   res.write('881118 你好')
   // 6.断开响应
   res.end()
})
```

### 2.响应不同数据类型
```javascript
const http = require('http')
const fs = require('fs')
const server = http.createServer()
server.listen(8080, () => {
   console.log('http://127.0.0.1:8080')
})
server.on('request', (req, res) => {
   // 在响应数据之前设置响应头响应内容的类型
   // res.setHeader('Content-type', 'text/plain;charset=utf-8') 响应文本 res.end('hello')
   // res.setHeader('Content-type', 'text/html;charset=utf-8') 相应 html 标签 res.end('<h1>hello</h1>')

   // 响应 HTML 文档和图片
   // 如何访问根路径
   if(req.url === '/') {
      fs.readFile('./test/index.html', 'utf8', (err, data) => {
         res.write(data)
         res.end()
      })
   } else {
      // 响应图片
      fs.readFile('./test/images/ElectronWorkFlow.png', (err, data) => {
         res.end(data)
      })
   }
})
```

### 3.HTTP 的不同请求方法处理
验证客户端发送过来的请求方法，然后在根据不同的请求方法再判断不同的请求路径并做出响应
常用的请求方法有：

| 方法      | 说明                  |
|---------|---------------------|
| GET     | 获取服务器资源             |
| POST    | 向服务器提交数据            |
| PUT     | 向服务器写入资源，如果已存在则进行替换 |
| DELETE  | 删除资源                |
| HEAD    | 获取服务器响应首部           |
| OPTIONS | 询问服务器所支持的请求方法       |


#### 3.1 接收 GET 请求并处理参数
```javascript
const http = require('http')
const fs = require('fs')
const url = require('url')
const server = http.createServer()
server.listen(8080, () => {
   console.log('http://127.0.0.1:8080')
})
server.on('request', (req, res) => {
   // 获取请求类型
   if(req.method === 'GET') {
      // console.log(req.url)
      // GET 方法获取参数 http://127.0.0.1:8080/user?id=123
      console.log(url.parse(req.url, true).query.id)
      if(req.url === '/') {
         fs.readFile('./test/index.html', 'utf8', (err, data) => {
            res.write(data)
            res.end()
         })
      } else {
         // 相应图片
         fs.readFile('./test/images/ElectronWorkFlow.png', (err, data) => {
            res.end(data)
         })
      }
   } else if(req.method === 'POST') {

   }
})

```

### 3.2 POST 请求接收并处理参数