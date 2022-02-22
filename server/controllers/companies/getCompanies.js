const {db_getCompanies} = require("../../models/db_companies")
const Response = require("../../utilities/response")


const getCompanies = async function (req,res)  {
    try {
        let dbRes = await db_getCompanies()
        let response = new Response(false, 200, "La lista de companies es:", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al consultar la lista de compañías')
        res.status(500).send(response)
    }
}

module.exports= {getCompanies}