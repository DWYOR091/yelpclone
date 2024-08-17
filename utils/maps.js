const ErrorHandler = require('./ErrorHandler')

//here maps
const baseUrl = "https://geocode.search.hereapi.com/v1"
const apiKey = "OLzZS33W041yPBUxtP49_gWw3_KKa01cSgwS84PdEWQ"


const geocode = async (address) => {
    try {
        const url = `${baseUrl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()
        return data.items[0]
    } catch (error) {
        throw new ErrorHandler(error, 500)
    }
}


const geometry = async (address) => {
    try {
        const { position } = await geocode(address)
        return {
            type: 'Point',
            coordinates: [position.lat, position.lng]
        }
    } catch (error) {
        throw new ErrorHandler(error, 500)
    }
}

module.exports = {
    geocode, geometry
}