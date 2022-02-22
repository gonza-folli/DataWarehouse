const { db_removeCountry } = require("../../models/db_location")
const Response = require('../../utilities/response')


const removeCountry = async function (req,res) {
    const {id_country, country} = req.body
    try {
        await db_removeCountry([id_country])
        response = new Response(false,200,`País ${country} eliminado exitosamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al eliminar el país seleccionado')
        res.status(500).send(response)
    }
}


module.exports = {removeCountry}