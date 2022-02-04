const Response = require('../utilities/response');
const {db_getSingleUser, db_getOriginalUser} = require('../models/db_users')


async function validateFields (req,res,next) {
    try {
        const {name, lastname , email, rol, pass} = req.body
        if (name !="" && lastname !="" && email !="" && email !="" && rol !="" && pass !="") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,400,'Debe Completar TODOS los datos')
        res.status(400).send(response)
        return
    }
}

async function validateEditFields (req,res,next) {
    try {
        const {id_user, name, lastname , email, rol, pass} = req.body
        if (id_user !="", name !="" && lastname !="" && email !="" && email !="" && rol !="" && pass !="") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,400,'Debe Completar TODOS los datos')
        res.status(400).send(response)
        return
    }
}

async function findDuplicate (req,res,next) {
    try {
        const {name, lastname , email} = req.body
        let contactsDatabase = await db_getSingleUser([name, lastname , email])
        if (contactsDatabase.length == 0) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,400,'El usuario ya se encuentra registrado')
        res.status(400).send(response)
        return
    }
}

async function findDifferences (req,res,next) {
    try {
        const {id_user} = req.body
        const newUser = req.body
        let originalUser = await db_getOriginalUser([id_user])
        console.log(originalUser)
        console.log(newUser)

        if (originalUser[0].name != newUser.name || originalUser[0].lastname != newUser.lastname || originalUser[0].email != newUser.email || originalUser[0].rol != newUser.rol || originalUser[0].password != newUser.pass) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,400,'No se ha modificado ningun dato')
        res.status(400).send(response)
        return
    }
}

module.exports= {findDuplicate, validateFields, validateEditFields, findDifferences}