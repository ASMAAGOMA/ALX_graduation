const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger')
const errorhandler = require('./middleware/errorhandler')
const PORT = process.env.PORT || 3500
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', 'notFound.html'))
    }else if (req.accepts('json')){
        res.json({ message: '404 Not Found' })
    }else{
        res.type('txt').send('404 NOT FOUND')
    }
})
app.use(errorhandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))