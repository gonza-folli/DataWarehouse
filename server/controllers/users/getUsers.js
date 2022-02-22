const {db_getUsers} = require("../../models/db_users")
const Response = require("../../utilities/response")


const getUsers= async function (req,res)  {
    try {
        let dbRes = await db_getUsers()
        let response = new Response(false, 200, "La lista de usuarios es:", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al consultar la lista de usuarios')
        res.status(500).send(response)
    }
}

module.exports= {getUsers}