module.exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error-msg', 'You\'re Not Logged In!')
        return res.redirect('/login')
    }
    next()
}

module.exports.redirectifAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('success-msg', 'You\'re Log In Now!')
        return res.redirect('/places')
    }
    next()
}