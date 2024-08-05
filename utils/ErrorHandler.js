class ExpressErr extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message
        this.status = statusCode
    }
}

module.exports = ExpressErr