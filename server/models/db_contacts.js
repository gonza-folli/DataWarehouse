const sequelize = require("../utilities/dbConnection");

const db_getContacts = () =>
    sequelize.query('SELECT contacts.*, cities.city, states.state, countries.country, countries.subregion, companies.name AS company_name, JSON_ARRAYAGG(JSON_OBJECT("name",channels.name,"user_account",channels.user_account,"preferences",channels.preferences))AS channels FROM contacts INNER JOIN cities ON contacts.id_city = cities.id_city INNER JOIN states ON cities.id_state = states.id_state INNER JOIN countries ON states.id_country = countries.id_country INNER JOIN companies ON contacts.id_company = companies.id_company INNER JOIN contacts_channels ON contacts_channels.id_contact = contacts.id_contact INNER JOIN channels ON channels.id_channel = contacts_channels.id_channel GROUP BY contacts.id_contact;', {
        type: sequelize.QueryTypes.SELECT
    })


module.exports = {db_getContacts}