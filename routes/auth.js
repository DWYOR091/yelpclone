const express = require('express')
const router = express.Router()
const { redirectifAuth } = require('../middlewares/isAuth')
const AuthController = require('../controllers/AuthController')
const passport = require('passport')

router.get('/register', redirectifAuth, AuthController.registerForm)

router.post('/register', AuthController.registerStore)

router.get('/login', redirectifAuth, AuthController.loginForm)

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
        type: 'error-msg',
        msg: 'Invalid Username or Password',
    }
}), AuthController.login)

router.post('/logout', AuthController.logout)

module.exports = router