const multer = require('multer')
const path = require('path')
const ErrorHandler = require('../utils/ErrorHandler')

//lokasi penyimpanan
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/')
    },
    //optional
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: diskStorage,
    limits: { filesize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        } else {
            callback(new ErrorHandler('Image Only!', 405))
        }
    }
})

module.exports = upload