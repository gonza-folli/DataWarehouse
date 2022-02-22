const {db_getOriginalCity} = require("../../models/db_location")
const {db_getAvailableCities} = require("../../models/db_location")
const {db_editCountryStateCity} = require("../../models/db_location")
const {db_editCountryState} = require("../../models/db_location")
const Response = require("../../utilities/response")


const editLocation = async function (req,res)  {
    const {id_country, country , id_state, state, id_city, city, address} = req.body
    try {
        let originalCity = await db_getOriginalCity([id_city])
        let citiesDatabase = await db_getAvailableCities()
        let anyDuplicate = (citiesDatabase.filter(x => 
            x.city.toLowerCase() === city.toLowerCase() &&
            x.address.toLowerCase() === address.toLowerCase() &&
            x.state.toLowerCase() === state.toLowerCase() &&
            x.country.toLowerCase() === country.toLowerCase()
            ).length > 0);
        console.log(anyDuplicate)
        if (anyDuplicate === true) {throw new Error}
        if (originalCity[0].country !== country) {
            if (originalCity[0].state !== state) {
                if (originalCity[0].city !== city || originalCity[0].address !== address) {
                    let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
                    let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                    res.status(200).send(response)
                    return
                }
                let dbRes = await db_editCountryState([id_country, id_state, id_city])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
        }
        if (originalCity[0].country === country && originalCity[0].state !== state) {
            if (originalCity[0].city !== city || originalCity[0].address !== address) {
                let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
            let dbRes = await db_editCountryState([id_country, id_state, id_city])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
        }
        if (originalCity[0].country === country && originalCity[0].state === state) {
            if (originalCity[0].city !== city || originalCity[0].address !== address) {
                let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
        }
        if(originalCity[0].country === country && originalCity[0].state === state && originalCity[0].city === city && originalCity[0].address === address) {
            throw new Error
        }
    }
    catch (e) {
        response = new Response(true,500,'Error al modificar la dirección o la dirección ya existe')
        res.status(500).send(response)
    }
}

module.exports= {editLocation}