const {db_getContacts} = require('../../models/db_contacts');
const Response = require('../../utilities/response');

const getContacts = async function (req, res) {
    try{
        let dbRes = await db_getContacts()
        let newDb = dbRes.map(x =>  {
                let edit = JSON.parse(x.channels).map(y => JSON.parse(y))
                x.channels = edit
                return x
            })
        let response = new Response(false, 200, "La lista de contactos es:", newDb)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al consultar la lista de contactos')
        res.status(500).send(response)
    }

}

module.exports = {getContacts}