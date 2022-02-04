const {db_editUser} = require("../../models/db_users")
const Response = require("../../utilities/response")


const editUser = async function (req,res)  {
    const {id_user, name, lastname , email, rol, pass} = req.body
    try {
        let dbRes = await db_editUser([name, lastname , email, rol, pass, id_user])
        let response = new Response(false, 200, `Usuario ${name} ${lastname} modificado correctamente`, dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al modificar el usuario', e)
        res.status(400).send(response)
    }
}

module.exports= {editUser}