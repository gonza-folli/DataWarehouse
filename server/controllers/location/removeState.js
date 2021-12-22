const { db_removeState } = require("../../models/db_location")
const Response = require('../../utilities/response')


const removeState = async function (req,res) {
    const {id_state} = req.body
    try {
        await db_removeState([id_state])
        response = new Response(false,200,'Provincia eliminada exitosamente')
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al eliminar la provincia', e)
        res.status(400).send(response)
    }
}


module.exports = {removeState}