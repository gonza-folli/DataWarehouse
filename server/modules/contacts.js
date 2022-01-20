const express = require('express');
const router = express.Router()


const {getContacts} = require('../controllers/contacts/getContacts')
const {addContact} = require('../controllers/contacts/addContact')
const {removeContact} = require('../controllers/contacts/removeContact')

router.get('/', getContacts)
router.post('/', addContact)
router.delete('/', removeContact)


module.exports = router