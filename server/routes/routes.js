const contacts = require('../modules/contacts')
const location = require('../modules/location')
const companies = require('../modules/companies')
const users = require('../modules/users')


module.exports = function (app) {
    app.use("/users", users)
    app.use("/contacts", contacts)
    app.use("/location", location)
    app.use("/companies", companies)
}