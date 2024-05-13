const express = require('express');
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        let dataJSON = await readFile('./fixtures/db.json', 'utf8')
        res.send(JSON.parse(dataJSON).users)
    } catch (error) {
        res.status(500).json({error})
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});