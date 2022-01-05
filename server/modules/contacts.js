const express = require('express');
const router = express.Router()


const {getContacts} = require('../controllers/contacts/getContacts')

router.get('/', getContacts)


module.exports = router