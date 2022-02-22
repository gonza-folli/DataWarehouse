const Response = require('../utilities/response');
// const jwt_decode = require('jwt-decode');
const {db_getSingleUser, db_getOriginalUser, db_getSingleUserByMail} = require('../models/db_users')


async function validateFields (req,res,next) {
    try {
        const {name, lastname , email, rol, pass} = req.body
        if (name !="" && lastname !="" && email !="" && email !="" && rol !="" && pass !="") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,403,'Debe Completar TODOS los datos')
        res.status(403).send(response)
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
        let response = new Response(true,403,'Debe Completar TODOS los datos')
        res.status(403).send(response)
        return
    }
}

async function findDuplicate (req,res,next) {
    try {
        const {name, lastname , email} = req.body
        let contactsDatabase = await db_getSingleUser([name, lastname , email])
        let userbyMail = await db_getSingleUserByMail([email])
        if (contactsDatabase.length == 0 && userbyMail.length == 0 ) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,402,'El usuario ya se encuentra registrado o el E-mail utilizado')
        res.status(402).send(response)
        return
    }
}

async function findDifferences (req,res,next) {
    try {
        const {id_user} = req.body
        const newUser = req.body
        let originalUser = await db_getOriginalUser([id_user])
        if (originalUser[0].name != newUser.name || originalUser[0].lastname != newUser.lastname || originalUser[0].email != newUser.email || originalUser[0].rol != newUser.rol || originalUser[0].password != newUser.pass) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,406,'No se ha modificado ningun dato')
        res.status(406).send(response)
        return
    }
}

async function validateEmailRegex(req,res,next) {
    const {email} = req.body
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm
    const result = re.test(email)
    try {
        if (result) {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,404,'Debe ingresar un email válido')
        res.status(404).send(response)
        return
    }
}


module.exports= {findDuplicate, validateFields, validateEditFields, findDifferences, validateEmailRegex}