const express = require('express');
const { utils_readFile, utils_writeFile } = require('../utils/file');

const app = express();
const port = 3000;

const baseURL = './fixtures/db.json'

// 处理请求体   'content-type': 'application/x-www-form-urlencoded',
// app.use(express.urlencoded())
// 处理 'content-type': 'application/json',
app.use(express.json())

// 查询用户
app.get('/users', async (req, res) => {
    try {
        const userData = await utils_readFile(baseURL)
        res.send(userData)
    } catch (error) {
        res.status(500).json({error})
    }
});

// 新增用户
app.post('/user/add', async (req, res) => {
    // console.log('header', req.headers) // 通过请求头信息查看内容类型
    // console.log('req', req.body) // 查看请求体内容
    if(!req.body) res.status(403).json({error: '缺少用户信息'})
        
    const userData = await utils_readFile(baseURL)
    req.body.id = userData[userData.length - 1].id + 1
    userData.push(req.body)

    try {
        const newUserData = await utils_writeFile(baseURL, userData)
        if(!newUserData) res.status(200).send({message: '添加成功'})
    } catch (error) {
        res.status(500).json({error})
    }
})

// 修改用户
app.put('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
    try {
        const userList = await utils_readFile(baseURL)
        const isExsit = userList.findIndex(user => user.id === userId)
        if(!isExsit) res.status(403).json({error: '用户不存在!'})
        userList[isExsit] = {
            ...userList[isExsit],
            ...req.body
        }
        const newUserList = utils_writeFile(baseURL, userList)
        res.status(201).send({
            message: '修改成功!',
            data: userList[isExsit]
        })
    } catch (error) {
        
    }

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});