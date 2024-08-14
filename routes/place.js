const express = require('express')
const router = express.Router();
const isValidObjectId = require('../middlewares/isValidObjectId')
const { isAuth } = require('../middlewares/isAuth')
const { isAuthorPlace } = require('../middlewares/isAuthor')
const PlaceController = require('../controllers/PlaceController')
const { validasiPlace } = require('../middlewares/validators');
const upload = require('../config/multer');


router.route('/')
    .get(PlaceController.index)
    .post(isAuth, upload.array('image', 5), validasiPlace, PlaceController.store)
router.get('/create', isAuth, PlaceController.create)
router.get('/:id', isValidObjectId('/places'), PlaceController.show)
router.get('/edit/:id', isAuth, isAuthorPlace, isValidObjectId('/places'), PlaceController.edit)
router.put('/saveEdit/:id', isAuth, isAuthorPlace, upload.array('image', 5), isValidObjectId('/places'), validasiPlace, PlaceController.update)
router.route('/delete/:id')
    .delete(isAuthorPlace, isAuth, isValidObjectId('/places'), PlaceController.destroy);

router.delete('/:id/deleteImg', isAuthorPlace, isAuth, isValidObjectId('/places'), PlaceController.destroyImage);


module.exports = router