const {db_removeCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const removeCompanies = async function (req,res)  {
    const {id_company} = req.body
    console.log(id_company)
    try {
        let dbRes = await db_removeCompanies([id_company])
        let response = new Response(false, 200, "Companía eliminada correctamente", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,400,'Error al eliminar la compañía', e)
        res.status(400).send(response)
    }
}

module.exports= {removeCompanies}