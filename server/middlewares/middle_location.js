const Response = require('../utilities/response');
const { db_getCity } = require('../models/db_location')

async function findDuplicate (req,res,next) {
    const {city, address, country, state} = req.body
    try {
        let citiesDatabase = await db_getCity([country, state])
        let filtered = citiesDatabase.filter(x => 
            x.city.toLowerCase() == city.toLowerCase() &&
            x.address.toLowerCase() == address.toLowerCase() &&
            x.country == country &&
            x.state == state
        )
        if (filtered.length == 0) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,400,`El domicilio ${address} de la Ciudad ${city} ya se encuentra cargado en el Estado/Provincia ${state}, ${country} `)
        res.status(400).send(response)
        return
    }
}

module.exports= {findDuplicate}