const {db_addCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const addCompanies = async function (req,res)  {
    const {name, phone , id_city} = req.body
    try {
        await db_addCompanies([name, phone , id_city])
        let response = new Response(false, 200, `Companía ${name} agregada correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al agregar la compañía')
        res.status(500).send(response)
    }
}

module.exports= {addCompanies}