const ErrorHandler = require('../utils/ErrorHandler')
const { placeSchema } = require('../schemas/place')
const { reviewSchema } = require('../schemas/review')

module.exports.validasiPlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(msg, 400))
    } else {
        next()
    }
}

module.exports.validasiReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(msg, 400))
    } else {
        next()
    }
}