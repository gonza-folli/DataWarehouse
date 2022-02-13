const { db_removeState } = require("../../models/db_location")
const Response = require('../../utilities/response')


const removeState = async function (req,res) {
    const {id_state, state} = req.body
    try {
        await db_removeState([id_state])
        response = new Response(false,200,`Provincia ${state} eliminada exitosamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,`Primero debe eliminar las ciudades asociadas a la provincia ${state}`)
        res.status(400).send(response)
        return
    }
}


module.exports = {removeState}