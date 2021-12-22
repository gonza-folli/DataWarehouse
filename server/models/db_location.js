const sequelize = require('../utilities/dbConnection');

const db_getSubregion = (region) =>
    sequelize.query('SELECT subregion from countries WHERE region = ? GROUP BY subregion', {
        replacements: region,
        type: sequelize.QueryTypes.SELECT
    })

const db_getCountry = () =>
    sequelize.query('SELECT * from countries', {
        type: sequelize.QueryTypes.SELECT
    })


const db_getState = (country) =>
    sequelize.query('SELECT * from states INNER JOIN countries ON countries.id_country = states.id_country where country = ?', {
        replacements: country,
        type: sequelize.QueryTypes.SELECT
    })

const db_getCity= (country, state) =>
    sequelize.query('SELECT * from cities INNER JOIN states ON states.id_state = cities.id_state INNER JOIN countries ON countries.id_country = states.id_country where country = ? AND state = ?', {
        replacements: country, state,
        type: sequelize.QueryTypes.SELECT
    })


const db_addCountry= (region, subregion, country) =>
    sequelize.query('INSERT INTO countries (country, region, subregion) VALUES (?, ?, ?)', {
        replacements: region, subregion, country,
        type: sequelize.QueryTypes.INSERT
    })

const db_addState= (state,id_country) =>
    sequelize.query('INSERT INTO states (state,id_country) VALUES (?, ?)', {
        replacements: state,id_country,
        type: sequelize.QueryTypes.INSERT
    })

const db_addCity= (city, address, id_country, id_state) =>
    sequelize.query('INSERT INTO cities (city, address, id_country, id_state) VALUES (?, ?, ?, ?)', {
        replacements: city, address, id_country, id_state,
        type: sequelize.QueryTypes.INSERT
    })

const db_removeCountry= (id_country) =>
    sequelize.query('DELETE FROM countries WHERE id_country = ?', {
        replacements: id_country,
        type: sequelize.QueryTypes.DELETE
    })

const db_removeState= (id_state) =>
    sequelize.query('DELETE FROM states WHERE id_state = ?', {
        replacements: id_state,
        type: sequelize.QueryTypes.DELETE
    })
    
const db_removeCity= (id_city) =>
    sequelize.query('DELETE FROM cities WHERE id_city = ?', {
        replacements: id_city,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {db_getSubregion, db_getCountry, db_getState, db_getCity, db_addCountry, db_addState, db_addCity, db_removeCountry, db_removeState, db_removeCity}