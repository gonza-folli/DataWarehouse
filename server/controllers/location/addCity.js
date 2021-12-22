const {db_addCity} = require('../../models/db_location');

const addCity = async function (req,res)  {
    const {id_country, id_state, city, address} = req.body
    try {
        let dbRes = await db_addCity([city, address, id_country, id_state])
        console.log(dbRes)
        res.status(200).send(dbRes)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {addCity}