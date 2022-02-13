const {db_addUser} = require("../../models/db_users")
const Response = require("../../utilities/response")


const addUser = async function (req,res)  {
    const {name, lastname , email, pass} = req.body
    try {
        let dbRes = await db_addUser([name, lastname , email, pass])
        let response = new Response(false, 200, `Usuario ${name} ${lastname} agregado correctamente`, dbRes)
        console.log(response)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al agregar el usuario', e)
        res.status(400).send(response)
    }
}

module.exports= {addUser}