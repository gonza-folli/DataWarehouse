const {db_addContact, db_addChannel, db_addChannelDefault, db_addContactChannels} = require('../../models/db_contacts');
const Response = require('../../utilities/response');

const addContact = async function (req, res) {
    const {name, lastname, profile_photo, position, email, id_company, id_city, interest, channelData} = req.body
    try{
        let channelInfo = []
        let insertContact
        insertContact = await db_addContact([name, lastname, position, email, id_company, id_city, interest])
        if (channelData.whatsappUser !== "" ) {
            if (channelData.whatsappPref) {
                let insertChannel = await db_addChannel(['Whatsapp', channelData.whatsappUser, channelData.whatsappPref])
                channelInfo.push(insertChannel[0])
            } else {
                let insertChannel = await db_addChannelDefault(['Whatsapp', channelData.whatsappUser])
                channelInfo.push(insertChannel[0])
            }
        }
        if (channelData.instagramUser !== "" ) {
            if (channelData.instagramPref) {
                let insertChannel = await db_addChannel(['Instagram', channelData.instagramUser, channelData.instagramPref])
                channelInfo.push(insertChannel[0])
            } else {
                let insertChannel = await db_addChannelDefault(['Instagram', channelData.instagramUser])
                channelInfo.push(insertChannel[0])
            }
        }
        if (channelData.twitterUser !== "" ) {
            if (channelData.twitterPref) {
                let insertChannel = await db_addChannel(['Twitter', channelData.twitterUser, channelData.twitterPref])
                channelInfo.push(insertChannel[0])
            } else {
                let insertChannel = await db_addChannelDefault(['Twitter', channelData.twitterUser])
                channelInfo.push(insertChannel[0])
            }
        }
        if (channelData.facebookUser !== "" ) {
            if (channelData.facebookPref) {
                let insertChannel = await db_addChannel(['Facebook', channelData.facebookUser, channelData.facebookPref])
                channelInfo.push(insertChannel[0])
            } else {
                let insertChannel = await db_addChannelDefault(['Facebook', channelData.facebookUser])
                channelInfo.push(insertChannel[0])
            }
        }
        await channelInfo.map(x => db_addContactChannels([insertContact[0], x]))
        let response = new Response(false, 200, `Contacto ${name} ${lastname} agregado correctamente`)
        res.status(200).send(response)
        return
    }
    catch (e) {
        let response = new Response(true,500,'Error al agregar el contacto')
        res.status(500).send(response)
    }
}

module.exports = {addContact}