const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
//connect to mongo
mongoose.connect('mongodb://127.0.0.1/yelpclone')
    .then(result => {
        console.log('connect to mongodb')
    }).catch(error => {
        console.log(error)
    })

//ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)

app.get('/', (req, res) => {
    res.render('home');
});

//router
app.use('/places', require('./routes/place'))

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
