const ErrorHandler = require('./ErrorHandler')

//here maps
const baseUrl = "https://geocode.search.hereapi.com/v1"
const apiKey = "OLzZS33W041yPBUxtP49_gWw3_KKa01cSgwS84PdEWQ"


module.exports.geocode = async (address) => {
    try {
        const url = `${baseUrl}/geocode?q=Invalidenstr+117+Berlin&apiKey=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()
        return data.items[0]
    } catch (error) {
        throw new ErrorHandler(error)
    }
}