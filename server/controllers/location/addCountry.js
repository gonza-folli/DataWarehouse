const {db_addCountry} = require('../../models/db_location');
const Response = require('../../utilities/response');

const addCountry = async function (req,res)  {
    const {country, region, subregion} = req.body
    try {
        let dbRes = await db_addCountry([country, region, subregion])
        let response = new Response(false,200,`El pais ${country} ha sido agregado correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,400,`Error al agregar el país ${country}`)
        res.status(400).send(response)
    }   
}

module.exports = {addCountry}