require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const {logger, logevent} = require('./middleware/logger')
const mongoose = require('mongoose')

const errorhandler = require('./middleware/errorhandler')
const PORT = process.env.PORT || 3500
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')

app.use(logger)
app.use(cors({
    origin: 'https://cozycornerfront.vercel.app',
    methods: ["POST", "GET"],
    credentials: true,
    optionsSuccessStatus: 200
}));
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/menu', require('./routes/productRoutes'))

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

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logevent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})