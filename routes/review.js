const express = require('express')
const router = express.Router()
const isValidObjectId = require('../middlewares/isValidObjectId')
const { isAuth } = require('../middlewares/isAuth')
const { isAuthorReview } = require('../middlewares/isAuthor')
const ReviewController = require('../controllers/ReviewController')
const { validasiReview } = require('../middlewares/validators')
router.post('/:id/review', validasiReview, isAuth, isValidObjectId('/places'), ReviewController.store)

router.delete('/delete/:placeId/review/:reviewId', isAuthorReview, isAuth, isValidObjectId('/places'), ReviewController.destroy);

module.exports = router