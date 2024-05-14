const express = require('express');
const { utils_readFile, utils_writeFile } = require('../utils/file');

const app = express();
const port = 3000;

// 处理请求体   'content-type': 'application/x-www-form-urlencoded',
// app.use(express.urlencoded())
// 处理 'content-type': 'application/json',
app.use(express.json())

app.get('/user', async (req, res) => {
    try {
        const userData = await utils_readFile('./fixtures/db.json')
        res.send(userData)
    } catch (error) {
        res.status(500).json({error})
    }
});

app.post('/users', async (req, res) => {
    // console.log('header', req.headers) // 通过请求头信息查看内容类型
    // console.log('req', req.body) // 查看请求体内容
    if(!req.body) res.status(403).json({error: '缺少用户信息'})
        
    const userData = await utils_readFile('./fixtures/db.json')
    req.body.id = userData[userData.length - 1].id + 1
    userData.push(req.body)

    try {
        const newUserData = await utils_writeFile('./fixtures/db.json', userData)
        if(!newUserData) res.status(200).json({message: '添加成功'})
    } catch (error) {
        res.status(500).json({error})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});