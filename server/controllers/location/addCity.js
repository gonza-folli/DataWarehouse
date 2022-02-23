const {db_addCity} = require('../../models/db_location');
const Response = require('../../utilities/response');

const addCity = async function (req,res)  {
    const {id_country, id_state, city, address} = req.body
    try {
        let dbRes = await db_addCity([city, address, id_country, id_state])
        let response = new Response(false,200,`La ciudad ${city} ha sido agregada correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al agregar la ciudad ${city}`)
        res.status(500).send(response)
    }
}

module.exports = {addCity}