const express = require('express');
const router = express.Router()

const {getCompanies} = require('../controllers/companies/getCompanies')
const {addCompanies} = require('../controllers/companies/addCompanies')
const {editCompanies} = require('../controllers/companies/editCompanies')
const {removeCompanies} = require('../controllers/companies/removeCompanies')
const middleware = require('../middlewares/middle_companies')


router.get('/', getCompanies)
router.post('/', middleware.validateCompFields, addCompanies)
router.put('/', middleware.validateCompFields, editCompanies)
router.delete('/', removeCompanies)


module.exports = router