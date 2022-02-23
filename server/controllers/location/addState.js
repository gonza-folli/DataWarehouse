const { db_addState } = require("../../models/db_location");
const Response = require('../../utilities/response');


const addState = async function (req,res) {
    const {id_country, state} = req.body
    try {
        let dbRes = await db_addState([state, id_country])
        let response = new Response(false,200,`La provincia ${state} ha sido agregada correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al agregar la provincia ${state}`)
        res.status(500).send(response)
    }
}


module.exports = {addState}