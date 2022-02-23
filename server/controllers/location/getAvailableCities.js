const {db_getAvailableCities} = require('../../models/db_location');
const Response = require('../../utilities/response');



const getAvailableCities = async function (req, res) {
    try{
        let dbRes = await db_getAvailableCities()
        response = new Response(false,200,'Las ciudades disponibles son:', dbRes)
        res.status(200).send(response)

    } catch(e) {
        response = new Response(true,400,'Error al obtener la lista de ciudades')
        res.status(400).send(response)
    }

}

module.exports = {getAvailableCities}