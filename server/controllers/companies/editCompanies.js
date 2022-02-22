const {db_editCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const editCompanies = async function (req,res)  {
    const {name, phone , id_city, id_company} = req.body
    try {
        let dbRes = await db_editCompanies([name, phone , id_city, id_company])
        let response = new Response(false, 200, "Companía modificada correctamente")
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al modificar la compañía')
        res.status(500).send(response)
    }
}

module.exports= {editCompanies}