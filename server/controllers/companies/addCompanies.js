const {db_addCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const addCompanies = async function (req,res)  {
    const {name, phone , id_city} = req.body
    try {
        let dbRes = await db_addCompanies([name, phone , id_city])
        let response = new Response(false, 200, "Companía agregada correctamente", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al agregar la compañía', e)
        res.status(400).send(response)
    }
}

module.exports= {addCompanies}