const {db_getChannelIds, db_removeContactChannels, db_removeChannel, db_removeContact} = require('../../models/db_contacts');
const Response = require('../../utilities/response');

const removeMultipleContacts = async function (req, res) {
    const ids = req.body.map(x => x.id_contact)
    try{
        for ( let i=0; i< ids.length; i++) {
            let getChannelIds = await db_getChannelIds([ids[i]])
            await db_removeContactChannels([ids[i]])
            await getChannelIds.map(x => db_removeChannel([x.id_channel]))
            await db_removeContact([ids[i]])
        }
        let response = new Response(false, 200, `Contactos eliminados correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        console.log(e)
        let response = new Response(true,500,`Error al eliminar los contactos`)
        res.status(500).send(response)
    }

}

module.exports = {removeMultipleContacts}