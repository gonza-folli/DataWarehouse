const express = require('express');
const router = express.Router()


const {getContacts} = require('../controllers/contacts/getContacts')
const {addContact} = require('../controllers/contacts/addContact')
const {editContact} = require('../controllers/contacts/editContact')
const {removeContact} = require('../controllers/contacts/removeContact')
const middleware = require('../middlewares/middle_contacts')

router.get('/', getContacts)
router.post('/', addContact)
router.put('/', middleware.validateEditFields, middleware.findDifferences, middleware.validateChannelFields, editContact)
router.delete('/', removeContact)


module.exports = router