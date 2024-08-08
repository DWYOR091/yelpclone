const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        await User.register(user, password)
        req.flash('success-msg', 'Registered Successfully, Now You Can Log In!')
        res.redirect('/places')
    } catch (error) {
        req.flash('error-msg', error.message)
        res.redirect('/places')
    }
})

module.exports = router