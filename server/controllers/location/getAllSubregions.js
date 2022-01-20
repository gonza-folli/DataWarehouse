const {db_getAllSubregions, db_getCountriesFromSubreg} = require('../../models/db_location');
const Response = require('../../utilities/response')

const getAllSubregions = async function (req, res) {
    const {subregion} = req.query
    console.log(subregion)
    try{
        if (!subregion) {
            let dbRes = await db_getAllSubregions()
            response = new Response(false,200,'El Listado de las subregiones es el siguiente', dbRes)
            res.status(200).send(response)
        } else {
            let dbRes = await db_getCountriesFromSubreg([subregion])
            response = new Response(false,200,'El Listado de las paises pertenecientes a la subregion es el siguiente', dbRes)
            res.status(200).send(response)
        }
    } catch(e) {
        response = new Response(true,400,'Error al consultar el listado de subregiones/paises', e)
        res.status(400).send(response)
    }

}

module.exports = {getAllSubregions}