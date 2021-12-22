const express = require('express');
const router = express.Router()

const {getCompanies} = require('../controllers/companies/getCompanies')
const {removeCompanies} = require('../controllers/companies/removeCompanies')



router.get('/', getCompanies)
router.delete('/', removeCompanies)


module.exports = router