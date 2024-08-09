const User = require('../models/user')

module.exports = {
    registerForm: (req, res) => {
        res.render('auth/register')
    }
    ,
    registerStore: async (req, res, next) => {
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
    }
    ,
    loginForm: (req, res) => {
        res.render('auth/login')
    }
    ,
    login: (req, res) => {
        req.flash('success-msg', 'You Are Logged In')
        res.redirect('/places')
    }
    ,
    logout: (req, res, next) => {
        req.logout((err) => {
            err ? next(err) : ''
            req.flash('success-msg', 'You\'re Logged  Out!')
            res.redirect('/login')
        })
    }
}