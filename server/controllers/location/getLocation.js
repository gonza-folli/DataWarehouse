const {db_getSubregion, db_getCountry, db_getState, db_getCity, db_getCitiesFromCountry, db_getAddressFromCities} = require('../../models/db_location');
const Response = require('../../utilities/response')

const getLocation = async function (req, res) {
    const {region, country, state, id_country, city} = req.query
    try{
        if (region) {
            console.log(region)
            let dbRes = await db_getSubregion([region])
            res.status(200).send(dbRes)
        } if (!country && !state && !region && !id_country && !city) {
            let dbRes = await db_getCountry()
            res.status(200).send(dbRes)
        } if (country && !state && !region) {
            let dbRes = await db_getState([country])
            res.status(200).send(dbRes)
        } if (state && !region) {
            let dbRes = await db_getCity([country, state])
            res.status(200).send(dbRes)
        } if (id_country) {
            let dbRes = await db_getCitiesFromCountry([id_country])
            response = new Response(false,200,'El Listado de las ciudades del país es el siguiente', dbRes)
            res.status(200).send(response)
        } if (city) {
            let dbRes = await db_getAddressFromCities([city])
            response = new Response(false,200,'El Listado de las direcciones de la ciudad es el siguiente', dbRes)
            res.status(200).send(response)
        }
    } catch(e) {
        res.status(400).send(e)
    }

}

module.exports = {getLocation}