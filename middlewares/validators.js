const ErrorHandler = require('../utils/ErrorHandler')
const { placeSchema } = require('../schemas/place')

module.exports.validasiPlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(msg, 400))
    } else {
        next()
    }
}