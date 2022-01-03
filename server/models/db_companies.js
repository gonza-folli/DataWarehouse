const sequelize = require("../utilities/dbConnection");

const db_getCompanies = () =>
    sequelize.query('SELECT companies.*, cities.city, cities.address, states.id_state, states.state, countries.id_country, countries.country FROM companies INNER JOIN cities ON companies.id_city = cities.id_city INNER JOIN states ON cities.id_state = states.id_state INNER JOIN countries ON states.id_country = countries.id_country;', {
        type: sequelize.QueryTypes.SELECT
    })

const db_addCompanies = (name, phone , id_city) =>
    sequelize.query('INSERT INTO companies (name, phone , id_city) VALUES (?, ?, ?)', {
        replacements: name, phone , id_city,
        type: sequelize.QueryTypes.INSERT
    })

const db_editCompanies = (name, phone , id_city, id_company) =>
    sequelize.query('UPDATE companies SET name = ?, phone = ?, id_city = ? WHERE id_company = ?', {
        replacements: name, phone , id_city, id_company,
        type: sequelize.QueryTypes.UPDATE
    })

const db_removeCompanies = (id_company) =>
    sequelize.query('DELETE from companies where id_company = ?', {
        replacements: id_company,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {db_getCompanies, db_removeCompanies, db_addCompanies, db_editCompanies}