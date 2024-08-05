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

router.get('/create', (req, res) => {
    res.render('place/create')
})

router.post('/', async (req, res, next) => {
    try {
        const place = new Place(req.body.place)
        console.log(place)
        await place.save()
        res.redirect('/places')
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const place = await Place.findById(id)
    res.render('place/detail', { place })
})

module.exports = router