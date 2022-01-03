const {db_getOriginalCity} = require("../../models/db_location")
const {db_getAvailableCities} = require("../../models/db_location")
const {db_editCountryStateCity} = require("../../models/db_location")
const {db_editCountryState} = require("../../models/db_location")
const Response = require("../../utilities/response")


const editLocation = async function (req,res)  {
    const {id_country, country , id_state, state, id_city, city, address} = req.body
    console.log(city)
    console.log(country)
    console.log(address)
    console.log(state)
    try {
        let originalCity = await db_getOriginalCity([id_city])
        let citiesDatabase = await db_getAvailableCities()
        console.log(citiesDatabase)
        let findDuplicate = await citiesDatabase.find( x => {
            return x.city.toLowerCase() === city.toLowerCase() && 
            x.address.toLowerCase() === address.toLowerCase() &&
            x.state.toLowerCase() === state.toLowerCase() &&
            x.country.toLowerCase() === country.toLowerCase()
        })
        console.log(findDuplicate)
        // if (findDuplicate === true) {throw new Error}
        // if (originalCity[0].country !== country) {
        //     if (originalCity[0].state !== state) {
        //         if (originalCity[0].city !== city || originalCity[0].address !== address) {
        //             let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
        //             let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
        //             res.status(200).send(response)
        //             return
        //         }
        //         let dbRes = await db_editCountryState([id_country, id_state, id_city])
        //         let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
        //         res.status(200).send(response)
        //         return
        //     }
        // }
        // if (originalCity[0].country === country && originalCity[0].state !== state) {
        //     if (originalCity[0].city !== city || originalCity[0].address !== address) {
        //         let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
        //         let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
        //         res.status(200).send(response)
        //         return
        //     }
        //     let dbRes = await db_editCountryState([id_country, id_state, id_city])
        //         let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
        //         res.status(200).send(response)
        //         return
        // }
        // if (originalCity[0].country === country && originalCity[0].state === state) {
        //     if (originalCity[0].city !== city || originalCity[0].address !== address) {
        //         let dbRes = await db_editCountryStateCity([city, address, id_country, id_state, id_city])
        //         let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
        //         res.status(200).send(response)
        //         return
        //     }
        // }
        // if(originalCity[0].country === country && originalCity[0].state === state && originalCity[0].city === city && originalCity[0].address === address) {
        //     throw new Error
        // }
    }
    catch (e) {
        response = new Response(true,400,'Error al modificar la dirección', e)
        res.status(400).send(response)
    }
}

module.exports= {editLocation}