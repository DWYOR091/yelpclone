const mongoose = require('mongoose')

module.exports = (redirectUrl = '/') => {
    return (req, res, next) => {
        const paramsId = ['id', 'reviewId', 'placeId'].find(param => req.params[param])
        !paramsId ? next() : ''

        const id = req.params[paramsId];
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error-msg', 'Invalid Id / Data tidak ditemukan');
            return res.redirect(redirectUrl);
        }

        next()
    }
}

