const {db_removeCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const removeCompanies = async function (req,res)  {
    const {id_company} = req.body
    try {
        let dbRes = await db_removeCompanies([id_company])
        let response = new Response(false, 200, "Companía eliminada correctamente")
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,410,'Compañía asociada a algún contacto. Primero debe eliminar o modificar dicho vínculo')
        res.status(410).send(response)
    }
}

module.exports= {removeCompanies}