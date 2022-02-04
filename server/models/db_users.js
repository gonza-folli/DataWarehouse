const sequelize = require('../utilities/dbConnection');

const db_getUsers = () =>
    sequelize.query('SELECT * from users', {
        type: sequelize.QueryTypes.SELECT
    })

const db_getSingleUser = (name, lastname , email) =>
    sequelize.query('SELECT * from users WHERE name = ? AND lastname = ? AND email = ?', {
        replacements: name, lastname , email,
        type: sequelize.QueryTypes.SELECT
    })

const db_getOriginalUser = (id_user) =>
    sequelize.query('SELECT * from users WHERE id_user = ?', {
        replacements: id_user,
        type: sequelize.QueryTypes.SELECT
    })

const db_addUser = (name, lastname , email, rol, pass) =>
    sequelize.query('INSERT INTO users (name, lastname , email, rol, password) VALUES (?, ?, ?, ?, ?)', {
        replacements: name, lastname , email, rol, pass,
        type: sequelize.QueryTypes.INSERT
    })

const db_editUser = (name, lastname , email, rol, pass, id_user) =>
    sequelize.query('UPDATE users SET name = ?, lastname = ?, email = ?, rol = ?, password = ? WHERE id_user = ?', {
        replacements: name, lastname , email, rol, pass, id_user,
        type: sequelize.QueryTypes.UPDATE
    })

const db_removeUser = (id_user) =>
    sequelize.query('DELETE FROM users WHERE id_user = ?', {
        replacements: id_user,
        type: sequelize.QueryTypes.DELETE
    })


module.exports = {db_getUsers, db_getSingleUser, db_getOriginalUser, db_addUser, db_editUser, db_removeUser}