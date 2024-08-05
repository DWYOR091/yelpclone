const mongoose = require('mongoose')
const { Schema } = mongoose

const placeSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String
})

module.exports = mongoose.model('Place', placeSchema)