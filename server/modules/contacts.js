const express = require('express');
const router = express.Router()


const {getContacts} = require('../controllers/contacts/getContacts')
const {addContact} = require('../controllers/contacts/addContact')
const {editContact} = require('../controllers/contacts/editContact')
const {removeContact} = require('../controllers/contacts/removeContact')
const {removeMultipleContacts} = require('../controllers/contacts/removeMultipleContacts')
const middleware = require('../middlewares/middle_contacts')

router.get('/', getContacts)
router.post('/', middleware.validateAddFields, middleware.validateEmailRegex, middleware.findDuplicate, middleware.validateChannelFields, addContact)
router.put('/', middleware.validateEditFields, middleware.findDifferences, middleware.validateEmailRegex, middleware.validateChannelEditFields, editContact)
router.delete('/', removeContact)
router.delete('/massive', removeMultipleContacts)


module.exports = router