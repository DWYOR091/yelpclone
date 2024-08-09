module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('success-msg', 'You\'re Log In Now!')
        return res.redirect('/places')
    }
    next()
}