const Joi = require('joi')

module.exports.placeSchema = Joi.object({
    place: Joi.object({
        title: Joi.string().min(3).required(),
        price: Joi.number().min(1).required(),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
})