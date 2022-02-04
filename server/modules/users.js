const express = require('express');
const router = express.Router()


const {getUsers} = require('../controllers/users/getUsers')
const {addUser} = require('../controllers/users/addUser')
const {editUser} = require('../controllers/users/editUser')
const {removeUser} = require('../controllers/users/removeUser')
const middleware = require('../middlewares/middle_users')

router.get('/', getUsers)
router.post('/', middleware.validateFields, middleware.findDuplicate, addUser)
router.put('/', middleware.validateEditFields, middleware.findDifferences, editUser)
router.delete('/', removeUser)


module.exports = router