const express = require('express')
const router = express.Router()
const isValidObjectId = require('../middlewares/isValidObjectId')
const { isAuth } = require('../middlewares/isAuth')
const { isAuthorReview } = require('../middlewares/isAuthor')
const ReviewController = require('../controllers/ReviewController')

router.post('/:id/review', isAuth, isValidObjectId('/places'), ReviewController.store)

router.delete('/delete/:placeId/review/:reviewId', isAuthorReview, isAuth, isValidObjectId('/places'), ReviewController.destroy);

module.exports = router