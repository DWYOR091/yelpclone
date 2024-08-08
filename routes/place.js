const express = require('express')
const router = express.Router();
const Place = require('../models/place')
const { placeSchema } = require('../schemas/place')
const ErrorHandler = require('../utils/ErrorHandler')

//validasi
const validasiPlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(msg, 400))
    } else {
        next()
    }
}

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

router.post('/', validasiPlace, async (req, res, next) => {
    try {
        const place = new Place(req.body.place)
        console.log(place)
        await place.save()
        req.flash('success-msg', 'Place     Added Successfully')
        res.redirect('/places')
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const place = await Place.findById(id).populate('reviews')
        res.render('place/detail', { place })
    } catch (error) {
        next(error)
    }
})

router.get('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const place = await Place.findById(id)
        res.render('place/edit', { place })
    } catch (error) {
        next(error)
    }
})

router.put('/saveEdit/:id', validasiPlace, async (req, res, next) => {
    try {
        const { id } = req.params
        await Place.findByIdAndUpdate(id, req.body.place)
        res.redirect('/places')
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await Place.findByIdAndDelete(id)
        res.redirect('/places')
    } catch (error) {
        next(error)
    }
})

module.exports = router