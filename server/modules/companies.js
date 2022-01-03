const express = require('express');
const router = express.Router()

const {getCompanies} = require('../controllers/companies/getCompanies')
const {addCompanies} = require('../controllers/companies/addCompanies')
const {editCompanies} = require('../controllers/companies/editCompanies')
const {removeCompanies} = require('../controllers/companies/removeCompanies')



router.get('/', getCompanies)
router.post('/', addCompanies)
router.put('/', editCompanies)
router.delete('/', removeCompanies)


module.exports = router