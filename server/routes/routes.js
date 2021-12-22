const location = require('../modules/location')
const companies = require('../modules/companies')


module.exports = function (app) {
    app.use("/location", location)
    app.use("/companies", companies)
}