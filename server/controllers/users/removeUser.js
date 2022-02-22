const {db_removeUser, db_getOriginalUser} = require("../../models/db_users")
const Response = require("../../utilities/response")


const removeUser = async function (req,res)  {
    const {id_user, name, lastname} = req.body
    const decoded = req.decodedToken
    try {
        let dbRes = await db_getOriginalUser([id_user])
        if (dbRes[0].email == "masteruser") {
            response = new Response(true,408,'No se puede eliminar el Master USER')
            res.status(408).send(response)
            return
        } else {
            await db_removeUser([id_user])
            let response = new Response(false, 200, `Usuario ${name} ${lastname} eliminado correctamente`)
            res.status(200).send(response)
            return
        }
    }
    catch (e) {
        response = new Response(true,500,'Error al eliminar el usuario')
        res.status(500).send(response)
    }
}

module.exports= {removeUser}