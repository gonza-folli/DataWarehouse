const { db_addState } = require("../../models/db_location")


const addState = async function (req,res) {
    const {id_country, state} = req.body
    try {
        let dbRes = await db_addState([state, id_country])
        console.log(dbRes)
        res.status(200).send(dbRes)
    }
    catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {addState}