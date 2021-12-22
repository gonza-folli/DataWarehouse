const {db_getSubregion} = require('../../models/db_location');
const {db_getCountry} = require('../../models/db_location');
const {db_getState} = require('../../models/db_location');
const {db_getCity} = require('../../models/db_location');


const getLocation = async function (req, res) {
    const {region, country, state} = req.query
    try{
        if (region) {
            console.log(region)
            let dbRes = await db_getSubregion([region])
            res.status(200).send(dbRes)
        }
        if (!country && !state && !region) {
            let dbRes = await db_getCountry()
            res.status(200).send(dbRes)
        } if (country && !state && !region) {
            let dbRes = await db_getState([country])
            res.status(200).send(dbRes)
        } if (state && !region) {
            let dbRes = await db_getCity([country, state])
            res.status(200).send(dbRes)
        }
    } catch(e) {
        res.status(400).send(e)
    }

}

module.exports = {getLocation}