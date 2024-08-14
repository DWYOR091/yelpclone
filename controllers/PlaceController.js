const Place = require('../models/place')
const fs = require('fs')
const ErrorHandler = require('../utils/ErrorHandler')

module.exports = {
    index: async (req, res, next) => {
        try {
            const places = await Place.find()
            res.render('place/index', { places })
        } catch (error) {
            next(error)
        }
    }
    ,
    store: async (req, res, next) => {
        try {
            const images = req.files.map(file => {
                return {
                    path: file.path,
                    filename: file.filename
                }
            })
            const place = new Place(req.body.place)
            place.images = images
            place.author = req.user._id
            await place.save()
            req.flash('success-msg', 'Place Added Successfully')
            res.redirect('/places')
        } catch (error) {
            next(error)
        }
    }
    ,
    create: (req, res) => {
        res.render('place/create')
    }
    ,
    show: async (req, res, next) => {
        try {
            const { id } = req.params
            const place = await Place.findById(id)
                .populate({
                    //nested populate
                    path: 'reviews',
                    populate: {
                        path: 'author'
                    }
                })
                .populate('author')
            res.render('place/detail', { place })
        } catch (error) {
            next(error)
        }
    }
    ,
    edit: async (req, res, next) => {
        try {
            const { id } = req.params
            const place = await Place.findById(id)
            res.render('place/edit', { place })
        } catch (error) {
            next(error)
        }
    }
    ,
    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const place = await Place.findByIdAndUpdate(id, req.body.place)


            if (req.files && req.files.length > 0) {
                place.images.forEach(image => {
                    fs.unlink(image.path, err => new ErrorHandler(err))
                })

                const images = req.files.map(file => ({
                    path: file.path,
                    filename: file.filename
                }))
                place.images = images
                await place.save()
            }
            req.flash('success-msg', 'Place Updated Successfully')
            res.redirect(`/places/${id}`)
        } catch (error) {
            next(error)
        }
    }
    ,
    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const place = await Place.findById(id)
            if (place.images.length > 0) {
                place.images.forEach(image => {
                    fs.unlink(image.path, err => new ErrorHandler(err))
                })
            }
            await place.deleteOne()
            req.flash('success-msg', 'Place Deleted Successfully')
            res.redirect('/places')
        } catch (error) {
            next(error)
        }
    }
    ,
    destroyImage: async (req, res, next) => {
        try {
            const { id } = req.params
            const { images } = req.body
            if (!images || images.length == 0) {
                req.flash('error-msg', 'Please Select At least One Image')
                res.redirect(`/places/edit/${id}`)
            }

            images.forEach(image => {
                fs.unlink(image, err => { new ErrorHandler(err) })
            })

            await Place.findByIdAndUpdate(
                id,
                { $pull: { images: { path: { $in: images } } } }
            )
            req.flash('success-msg', 'Deleted Image Succesfully!')
            return res.redirect(`/places/edit/${id}`)
        } catch (error) {
            next(error)
        }
    }
}
