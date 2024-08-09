const Place = require('../models/place')
const Review = require('../models/review')

module.exports.isAuthorPlace = async (req, res, next) => {
    const { id } = req.params
    const place = await Place.findById(id)
    if (!place.author.equals(req.user._id)) {
        req.flash('error-msg', 'Not Authorized')
        return res.redirect('/places')
    }

    next()
}

module.exports.isAuthorReview = async (req, res, next) => {
    const { placeId, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error-msg', 'Not Authorized')
        return res.redirect(`/places/${placeId}`)
    }

    next()
}
