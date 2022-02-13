const {db_login} = require('../../models/db_users')
const validateToken = require('../../middlewares/validateToken')
const Response = require('../../utilities/response');

const login = async function (req, res) {
    const {user, pass} = req.body
    try {
        let dbRes = await db_login([user,pass])
        if (dbRes.length >0) {
            const token = await validateToken(dbRes[0].email, dbRes[0].rol)
            dbRes[0].key = token
            delete dbRes[0]["password"]
            let response = new Response(false,200,'Usuario Logeado correctamente', dbRes[0])
            res.status(200).send(response)
        } else {
            throw new Error
        }
    } catch (e) {
        let response = new Response(true,401,'Datos ingresados inválidos')
        res.status(401).send(response)
    }
}

module.exports = {login}