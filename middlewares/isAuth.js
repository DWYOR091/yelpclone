module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error-msg', 'You\'re Not Logged In!')
        return res.redirect('/login')
    }
    next()
}