const {db_addCountry} = require('../../models/db_location');

const addCountry = async function (req,res)  {
    const {country, region, subregion} = req.body
    try {
        let dbRes = await db_addCountry([country, region, subregion])
        console.log(dbRes)
        res.status(200).send(dbRes)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {addCountry}