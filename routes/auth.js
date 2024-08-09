const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const ensureNotAuth = require('../middlewares/redirectIfAuth')

router.get('/register', ensureNotAuth, (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            err ? next(err) : ''
            req.flash('success-msg', 'Registered Successfully, Now You Log In!')
            res.redirect('/places')
        })

    } catch (error) {
        req.flash('error-msg', error.message)
        res.redirect('/register')
    }
})

router.get('/login', ensureNotAuth, (req, res) => {
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

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        err ? next(err) : ''
        req.flash('success-msg', 'You\'re Logged  Out!')
        res.redirect('/login')
    })
})

module.exports = router