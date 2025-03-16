const fs = require('fs')

const logRequest = (req, _, next) => {
    const data = 'Request Received: ' + req.method + " On " + req.url
    console.log(data);

    fs.appendFileSync('log.txt', data)
    next()
}

module.exports = logRequest