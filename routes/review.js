const express = require('express')
const Review = require('../models/review')
const Place = require('../models/place')
const router = express.Router()
const isValidObjectId = require('../middlewares/isValidObjectId')
const isAuth = require('../middlewares/isAuth')

router.post('/:id/review', isAuth, isValidObjectId('/places'), async (req, res, next) => {
    try {
        const { id } = req.params
        const review = new Review(req.body.review)
        review.author = req.user._id
        await review.save()
        const place = await Place.findById(id)
        place.reviews.push(review)
        await place.save()
        req.flash('success-msg', 'Review Added Successfully')
        res.redirect(`/places/${id}`);
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:placeId/review/:reviewId', isAuth, isValidObjectId('/places'), async (req, res, next) => {
    try {
        const { placeId, reviewId } = req.params
        await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId)
        req.flash('success-msg', 'Review Deleted Successfully')
        res.redirect(`/places/${placeId}`)

    } catch (error) {
        next(error)
    }
});

module.exports = router