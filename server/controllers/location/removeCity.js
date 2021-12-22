const { db_removeCity } = require("../../models/db_location")
const Response = require('../../utilities/response')


const removeCity = async function (req,res) {
    const {id_city} = req.body
    try {
        await db_removeCity([id_city])
        response = new Response(false,200,'Ciudad/Domicilio eliminado exitosamente')
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al eliminar la Ciudad/Domicilio', e)
        res.status(400).send(response)
    }
}


module.exports = {removeCity}