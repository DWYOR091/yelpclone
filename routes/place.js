const express = require('express')
const router = express.Router();
const Place = require('../models/place')

router.get('/', async (req, res, next) => {
    try {
        const places = await Place.find()
        res.render('place/index', { places })
    } catch (error) {
        next(error)
    }
})

module.exports = router