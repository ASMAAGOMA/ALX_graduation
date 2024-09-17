const allowed = require('./allowedorigin')

const corsOptions = {
    origin: (origin, callback) =>{
        if (allowed.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORES'))
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}
module.exports = corsOptions