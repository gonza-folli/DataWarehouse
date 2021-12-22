const { db_removeCountry } = require("../../models/db_location")
const Response = require('../../utilities/response')


const removeCountry = async function (req,res) {
    const {id_country} = req.body
    try {
        let dbRes = await db_removeCountry([id_country])
        console.log(dbRes)
        response = new Response(false,200,'Pais eliminado exitosamente')
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al eliminar el país', e)
        res.status(400).send(response)
    }
}


module.exports = {removeCountry}