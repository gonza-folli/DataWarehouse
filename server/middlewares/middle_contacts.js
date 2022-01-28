const Response = require('../utilities/response');
const {db_getSingleContact} = require('../models/db_contacts');

async function validateEditFields (req,res,next) {
    try {
        const {id_contact, name, lastname, profile_photo, position, email, id_company, id_city, interest, newChannelData} = req.body
        if (id_contact !="" && name !="" && lastname !="" && position !="" && email !="" && id_company !="" && id_city !="" && interest!="") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,400,'Debe Completar TODOS los datos')
        res.status(400).send(response)
        return
    }
}

async function findDifferences (req,res,next) {
    try {
        const {id_contact} = req.body
        const newContact = req.body
        let contactsDatabase = await db_getSingleContact([id_contact])
        let originalContact = contactsDatabase.map(x =>  {
                let edit = JSON.parse(x.channels).map(y => JSON.parse(y))
                x.channels = edit
                return x
            })
        req.orig = originalContact
        let diffHeader = await findHeaderChanges(originalContact[0], newContact)
        let diffChannels = await findChannelChanges(originalContact[0], newContact)
        if (diffHeader || diffChannels.includes(true)) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,400,'No se ha modificado ningun dato')
        res.status(400).send(response)
        return
    }
}

async function findHeaderChanges (orig, newC) {
    if (orig.name != newC.name || orig.lastname != newC.lastname || orig.position != newC.position || orig.email != newC.email || orig.id_company != newC.id_company || orig.interest != newC.interest || orig.id_city != newC.id_city) {
        return true
    } else {
        return false
    }
}

async function findChannelChanges (orig, newC) {
    let changes = []
    if(newC.newChannelData.whatsappUser != "") {
        let originalAccount = orig.channels.find(x => x.name == "Whatsapp")
        let newAccount = newC.newChannelData.whatsappUser.toString()
        let newAccountPref = newC.newChannelData.whatsappPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.name == "Whatsapp") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.instagramUser != "") {
        let originalAccount = orig.channels.find(x => x.name == "Instagram")
        let newAccount = newC.newChannelData.instagramUser.toString()
        let newAccountPref = newC.newChannelData.instagramPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.name == "Instagram") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.twitterUser != "") {
        let originalAccount = orig.channels.find(x => x.name == "Twitter")
        let newAccount = newC.newChannelData.twitterUser.toString()
        let newAccountPref = newC.newChannelData.twitterPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.name == "Twitter") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.facebookUser != "") {
        let originalAccount = orig.channels.find(x => x.name == "Facebook")
        let newAccount = newC.newChannelData.facebookUser.toString()
        let newAccountPref = newC.newChannelData.facebookPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.name == "Facebook") ? changes.push(true) : changes.push(false)
    }
    return changes
}


async function validateChannelFields (req,res,next) {
    const {newChannelData} = req.body
    try {
        if (newChannelData.whatsappUser !== "" || newChannelData.instagramUser !== "" || newChannelData.twitterUser !== "" || newChannelData.facebookUser !== "" ) {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,400,'Debe ingresar al menos 1 canal de contacto')
        res.status(400).send(response)
        return
    }
}

module.exports = { validateEditFields, findDifferences, validateChannelFields }