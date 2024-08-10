const Place = require('../models/place')

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
            console.log(place)
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
            await Place.findByIdAndUpdate(id, req.body.place)
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
            await Place.findByIdAndDelete(id)
            req.flash('success-msg', 'Place Deleted Successfully')
            res.redirect('/places')
        } catch (error) {
            next(error)
        }
    }
}
