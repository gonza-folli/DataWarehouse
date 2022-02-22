const {db_getChannelIds, db_removeContactChannels, db_removeChannel, db_removeContact} = require('../../models/db_contacts');
const Response = require('../../utilities/response');

const removeContact = async function (req, res) {
    const {name, lastname, id_contact} = req.body
    try{
        let getChannelIds = await db_getChannelIds([id_contact])
        console.log(getChannelIds)
        await db_removeContactChannels([id_contact])
        await getChannelIds.map(x => db_removeChannel([x.id_channel]))
        await db_removeContact([id_contact])
        let response = new Response(false, 200, `El contacto ${name} ${lastname} ha sido eliminado correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        console.log(e)
        response = new Response(true,500,`Error al eliminar el contacto ${name} ${lastname}`, e)
        res.status(500).send(response)
    }

}

module.exports = {removeContact}