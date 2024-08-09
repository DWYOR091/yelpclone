const express = require('express')
const router = express.Router();
const isValidObjectId = require('../middlewares/isValidObjectId')
const { isAuth } = require('../middlewares/isAuth')
const { isAuthorPlace } = require('../middlewares/isAuthor')
const PlaceController = require('../controllers/PlaceController')
const { validasiPlace } = require('../middlewares/validators')


router.get('/', PlaceController.index)
router.get('/create', isAuth, PlaceController.create)
router.post('/', validasiPlace, PlaceController.store)
router.get('/:id', isValidObjectId('/places'), PlaceController.show)
router.get('/edit/:id', isAuthorPlace, isAuth, isValidObjectId('/places'), PlaceController.edit)
router.put('/saveEdit/:id', isAuthorPlace, isValidObjectId('/places'), validasiPlace, PlaceController.update)
router.delete('/delete/:id', isAuthorPlace, isAuth, isValidObjectId('/places'), PlaceController.destroy)

module.exports = router