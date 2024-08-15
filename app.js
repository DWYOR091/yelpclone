const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const ErrorHandler = require('./utils/ErrorHandler')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const { geocode } = require('./utils/maps')

//connect to mongo
mongoose.connect('mongodb://127.0.0.1/yelpclone')
    .then(result => {
        console.log('connect to mongodb')
    }).catch(error => {
        console.log(error)
    })

//middleware parsing
app.use(express.urlencoded({ extended: true }))

//method override
app.use(methodOverride('_method'));

//membuat folder static
app.use(express.static(path.join(__dirname, 'public')))

//ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)

//session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secur: true,// hanya kirim lewat https
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //jika ingin spesifik
        // maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

//konfigurasi connect flash
app.use(flash())

//passport harus d letakan sebelum session
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser()) //setter
passport.deserializeUser(User.deserializeUser()) //getter

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success_msg = req.flash('success-msg')
    res.locals.error_msg = req.flash('error-msg')
    next()
})

app.get('/', async (req, res) => {
    res.render('home');
});

//register
// app.get('/register', async (req, res) => {
//     const user = new User({
//         email: "user@gmail.com",
//         username: "user123"
//     })

//     const newUser = await User.register(user, 'password')
//     res.send(newUser)
// })

//router
app.use('/', require('./routes/auth'))
app.use('/places', require('./routes/place'))
app.use('/places', require('./routes/review'))

app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
