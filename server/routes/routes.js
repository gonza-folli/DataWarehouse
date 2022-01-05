const contacts = require('../modules/contacts')
const location = require('../modules/location')
const companies = require('../modules/companies')


module.exports = function (app) {
    app.use("/contacts", contacts)
    app.use("/location", location)
    app.use("/companies", companies)
}