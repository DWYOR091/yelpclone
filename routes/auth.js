const express = require('express')
const router = express.Router()
const { redirectifAuth } = require('../middlewares/isAuth')
const AuthController = require('../controllers/AuthController')
const passport = require('passport')

router.route('/register')
    .get(redirectifAuth, AuthController.registerForm)
    .post(AuthController.registerStore)

router.route('/login')
    .get(redirectifAuth, AuthController.loginForm)
    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: {
            type: 'error-msg',
            msg: 'Invalid Username or Password',
        }
    }), AuthController.login)

router.post('/logout', AuthController.logout)

module.exports = router