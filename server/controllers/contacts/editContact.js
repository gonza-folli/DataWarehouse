const {db_editContact, db_editChannel, db_addChannel, db_addChannelDefault, db_addContactChannels, db_removeSingleContactChannel, db_removeChannel} = require('../../models/db_contacts');
const Response = require('../../utilities/response');


const editContact = async function (req, res) {
    const {id_contact, name, lastname, profile_photo, position, email, id_company, id_city, interest, newChannelData} = req.body
    const originalContact = req.orig
    try{
        let channelInfo = []
        await db_editContact([name, lastname, position, email, id_company, id_city, interest, id_contact])
//////////////////////////                      
            if (newChannelData.whatsappUser !== "" ) {
                let channelId = originalContact[0].channels.filter(x => x.name == "Whatsapp").map(y => y.id_channel)
                if (channelId.length > 0) {
                    await db_editChannel(['Whatsapp', newChannelData.whatsappUser, newChannelData.whatsappPref, channelId])
                } else {
                    if (newChannelData.whatsappPref) {
                        let insertChannel = await db_addChannel(['Whatsapp', newChannelData.whatsappUser, newChannelData.whatsappPref])
                        channelInfo.push(insertChannel[0])
                    } else {
                        let insertChannel = await db_addChannelDefault(['Whatsapp', newChannelData.whatsappUser])
                        channelInfo.push(insertChannel[0])
                    }
                }
            } else {
                let channelId = originalContact[0].channels.filter(x => x.name == "Whatsapp").map(y => y.id_channel)
                if (channelId.length > 0 ) {
                    await db_removeSingleContactChannel([id_contact, channelId[0]])
                    await db_removeChannel([channelId[0]])
                }
            }
//////////////////////////                   
            if (newChannelData.instagramUser !== "" ) {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Instagram').map(y => y.id_channel)
                if (channelId.length > 0) {
                    await db_editChannel(['Instagram', newChannelData.instagramUser, newChannelData.instagramPref, channelId])
                } else {
                    if (newChannelData.instagramPref) {
                        let insertChannel = await db_addChannel(['Instagram', newChannelData.instagramUser, newChannelData.instagramPref])
                        channelInfo.push(insertChannel[0])
                    } else {
                        let insertChannel = await db_addChannelDefault(['Instagram', newChannelData.instagramUser])
                        channelInfo.push(insertChannel[0])
                    }
                }
            } else {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Instagram').map(y => y.id_channel)
                if (channelId.length > 0 ) {
                    await db_removeSingleContactChannel([id_contact, channelId[0]])
                    await db_removeChannel([channelId[0]])
                }
            }
//////////////////////////  
            if (newChannelData.twitterUser !== "" ) {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Twitter').map(y => y.id_channel)
                if (channelId.length > 0) {
                    await db_editChannel(['Twitter', newChannelData.twitterUser, newChannelData.twitterPref, channelId])
                } else {
                    if (newChannelData.twitterPref) {
                        let insertChannel = await db_addChannel(['Twitter', newChannelData.twitterUser, newChannelData.twitterPref])
                        channelInfo.push(insertChannel[0])
                    } else {
                        let insertChannel = await db_addChannelDefault(['Twitter', newChannelData.twitterUser])
                        channelInfo.push(insertChannel[0])
                    }
                }
            } else {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Twitter').map(y => y.id_channel)
                if (channelId.length > 0 ) {
                    await db_removeSingleContactChannel([id_contact, channelId[0]])
                    await db_removeChannel([channelId[0]])
                }
            }
////////////////////////// 
            if (newChannelData.facebookUser !== "" ) {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Facebook').map(y => y.id_channel)
                if (channelId.length > 0) {
                    await db_editChannel(['Facebook', newChannelData.facebookUser, newChannelData.facebookPref, channelId])
                } else {
                    if (newChannelData.facebookPref) {
                        let insertChannel = await db_addChannel(['Facebook', newChannelData.facebookUser, newChannelData.facebookPref])
                        channelInfo.push(insertChannel[0])
                    } else {
                        let insertChannel = await db_addChannelDefault(['Facebook', newChannelData.facebookUser])
                        channelInfo.push(insertChannel[0])
                    }
                }
            } else {
                let channelId = originalContact[0].channels.filter(x => x.name == 'Facebook').map(y => y.id_channel)
                if (channelId.length > 0 ) {
                    await db_removeSingleContactChannel([id_contact, channelId[0]])
                    await db_removeChannel([channelId[0]])
                }
            }

//////////////////////////  
            await channelInfo.map(x => db_addContactChannels([id_contact, x]))
            let response = new Response(false, 200, `Contacto ${name} ${lastname} ha sido modificado correctamente`)
            res.status(200).send(response)
            return
    }
    catch (e) {
        let response = new Response(true,400,'Error al consultar la lista de contactos', e)
        res.status(400).send(response)
    }
}

module.exports = {editContact}