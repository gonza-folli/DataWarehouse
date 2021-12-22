const location = require('../modules/location')


module.exports = function (app) {
    app.use("/location", location)
}