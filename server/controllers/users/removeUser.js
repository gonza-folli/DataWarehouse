const {db_removeUser} = require("../../models/db_users")
const Response = require("../../utilities/response")


const removeUser = async function (req,res)  {
    const {id_user, name, lastname} = req.body
    try {
        let dbRes = await db_removeUser([id_user])
        let response = new Response(false, 200, `Usuario ${name} ${lastname} eliminado correctamente`, dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al eliminar el usuario', e)
        res.status(400).send(response)
    }
}

module.exports= {removeUser}