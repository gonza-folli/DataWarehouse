const {db_getUsers} = require("../../models/db_users")
const Response = require("../../utilities/response")


const getUsers= async function (req,res)  {
    try {
        let dbRes = await db_getUsers()
        let response = new Response(false, 200, "La lista de usuarios es:", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al consultar la lista de usuarios', e)
        res.status(400).send(response)
    }
}

module.exports= {getUsers}