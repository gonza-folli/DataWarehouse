const express = require('express');
const router = express.Router()

const {getLocation} = require('../controllers/location/getLocation')
const {getAllSubregions} = require('../controllers/location/getAllSubregions')
const {editLocation} = require('../controllers/location/editLocation')
const {addCountry} = require('../controllers/location/addCountry')
const {removeCountry} = require('../controllers/location/removeCountry')
const {addState} = require('../controllers/location/addState')
const {removeState} = require('../controllers/location/removeState')
const {getAvailableCities} = require('../controllers/location/getAvailableCities')
const {addCity} = require('../controllers/location/addCity')
const {removeCity} = require('../controllers/location/removeCity')


router.get('/', getLocation)
router.get('/subregions', getAllSubregions)
router.put('/', editLocation)
router.post('/country', addCountry)
router.delete('/country', removeCountry)
router.post('/state', addState)
router.delete('/state', removeState)
router.get('/city', getAvailableCities)
router.post('/city', addCity)
router.delete('/city', removeCity)

module.exports = router