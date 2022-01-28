const sequelize = require("../utilities/dbConnection");

const db_getContacts = () =>
    sequelize.query('SELECT contacts.*, cities.city, cities.address, states.state, countries.country, countries.subregion, companies.name AS company_name, JSON_ARRAYAGG(JSON_OBJECT("name",channels.name,"user_account",channels.user_account,"preferences",channels.preferences))AS channels FROM contacts INNER JOIN cities ON contacts.id_city = cities.id_city INNER JOIN states ON cities.id_state = states.id_state INNER JOIN countries ON states.id_country = countries.id_country INNER JOIN companies ON contacts.id_company = companies.id_company INNER JOIN contacts_channels ON contacts_channels.id_contact = contacts.id_contact INNER JOIN channels ON channels.id_channel = contacts_channels.id_channel GROUP BY contacts.id_contact;', {
        type: sequelize.QueryTypes.SELECT
    })

const db_getSingleContact = (id_contact) =>
    sequelize.query('SELECT contacts.*, cities.city, cities.address, states.state, countries.country, countries.subregion, companies.name AS company_name, JSON_ARRAYAGG(JSON_OBJECT("id_channel",channels.id_channel,"name",channels.name,"user_account",channels.user_account,"preferences",channels.preferences))AS channels FROM contacts INNER JOIN cities ON contacts.id_city = cities.id_city INNER JOIN states ON cities.id_state = states.id_state INNER JOIN countries ON states.id_country = countries.id_country INNER JOIN companies ON contacts.id_company = companies.id_company INNER JOIN contacts_channels ON contacts_channels.id_contact = contacts.id_contact INNER JOIN channels ON channels.id_channel = contacts_channels.id_channel WHERE contacts.id_contact = ?;', {
        replacements: id_contact,
        type: sequelize.QueryTypes.SELECT
    })

const db_addContact = (name, lastname, position, email, id_company, id_city, interest) =>
    sequelize.query("INSERT INTO contacts (name, lastname, profile_photo, position, email, id_company, id_city, interest) VALUES (?, ?, 'https://i.imgur.com/3RegT51_d.webp', ?, ?, ?, ?, ?);", {
        replacements: name, lastname, position, email, id_company, id_city, interest,
        type: sequelize.QueryTypes.INSERT
    })

const db_editContact = (name, lastname, position, email, id_company, id_city, interest, id_contact) =>
    sequelize.query("UPDATE contacts SET name = ? , lastname = ?, position = ?, email = ?, id_company = ?, id_city = ?, interest = ? WHERE id_contact = ?;", {
        replacements: name, lastname, position, email, id_company, id_city, interest, id_contact,
        type: sequelize.QueryTypes.UPDATE
    })

const db_addChannel = (name, user , preferences) =>
    sequelize.query('INSERT INTO channels (name, user_account, preferences) VALUES (?, ?, ?);', {
        replacements: name, user, preferences,
        type: sequelize.QueryTypes.INSERT
    })

const db_editChannel = (name, user , preferences, channelId) =>
    sequelize.query('UPDATE channels  SET name = ?, user_account = ?, preferences = ? WHERE id_channel = ?;', {
        replacements: name, user, preferences, channelId,
        type: sequelize.QueryTypes.UPDATE
    })

const db_addChannelDefault = (name, user) =>
    sequelize.query('INSERT INTO channels (name, user_account, preferences) VALUES (?, ?, "Sin preferencia");', {
        replacements: name, user,
        type: sequelize.QueryTypes.INSERT
    })

const db_addContactChannels = (id_contact, id_channel) =>
    sequelize.query('INSERT INTO contacts_channels (id_contact,  id_channel) VALUES (?, ?);', {
        replacements: id_contact, id_channel,
        type: sequelize.QueryTypes.INSERT
    })

const db_getChannelIds = (id_contact) =>
    sequelize.query("SELECT * FROM contacts_channels WHERE id_contact = ?;", {
        replacements: id_contact,
        type: sequelize.QueryTypes.SELECT
    })

const db_removeContactChannels = (id_contact) =>
    sequelize.query("DELETE FROM contacts_channels WHERE id_contact = ?;", {
        replacements: id_contact,
        type: sequelize.QueryTypes.DELETE
    })

const db_removeSingleContactChannel = (id_contact, id_channel) =>
    sequelize.query("DELETE FROM contacts_channels WHERE id_contact = ? AND id_channel = ?;", {
        replacements: id_contact, id_channel,
        type: sequelize.QueryTypes.DELETE
    })
    
const db_removeChannel = (id_channel) =>
    sequelize.query("DELETE FROM channels WHERE id_channel = ?;", {
        replacements: id_channel,
        type: sequelize.QueryTypes.DELETE
    })

const db_removeContact = (id_contact) =>
    sequelize.query("DELETE FROM contacts WHERE id_contact = ?;", {
        replacements: id_contact,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {db_getContacts, db_getSingleContact, db_addContact, db_editContact, db_addChannel, db_editChannel, db_addChannelDefault, db_addContactChannels, db_getChannelIds, db_removeContactChannels, db_removeSingleContactChannel, db_removeChannel, db_removeContact}