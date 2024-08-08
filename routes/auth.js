const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        await User.register(user, password)
        req.flash('success-msg', 'Registered Successfully, Now You Can Log In!')
        res.redirect('/login')
    } catch (error) {
        req.flash('error-msg', error.message)
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
        type: 'error-msg',
        msg: 'Invalid Username or Password',
    }
}), (req, res) => {
    req.flash('success-msg', 'You Are Logged In')
    res.redirect('/places')
})

module.exports = router