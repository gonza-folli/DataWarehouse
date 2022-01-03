const {db_editCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const editCompanies = async function (req,res)  {
    const {name, phone , id_city, id_company} = req.body
    try {
        let dbRes = await db_editCompanies([name, phone , id_city, id_company])
        let response = new Response(false, 200, "Companía modificada correctamente", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al modificar la compañía', e)
        res.status(400).send(response)
    }
}

module.exports= {editCompanies}