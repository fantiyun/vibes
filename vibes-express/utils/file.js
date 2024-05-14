const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const utils_readFile = async (fileURL) => {
    const data = await readFile(fileURL, 'utf8')
    return JSON.parse(data)
}

const utils_writeFile = async (fileURL, writeData) => {
    return await writeFile(fileURL, JSON.stringify(writeData))
}

module.exports = {
    utils_readFile,
    utils_writeFile
}