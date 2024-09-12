const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logevent = async (message, filename) => {
    const datetime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logitem = `${datetime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', filename), logitem)
    }catch (err){
        console.logeventg(err)
    }
}

const logger = (req, res, next) => {
    logevent(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}
module.exports = {logevent, logger}