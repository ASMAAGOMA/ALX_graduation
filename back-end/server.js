const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'))
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', 'notFound.html'))
    }
    else if(req.accepts('json')) {
        res.json({Message: '404 NotFound'})
    }
    else {
        res.type('txt').send('404 NotFound')
    }
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})