const express = require('express');
const router = express.Router()


const {getUsers} = require('../controllers/users/getUsers')
const {addUser} = require('../controllers/users/addUser')
const {login} = require('../controllers/users/login')
const {editUser} = require('../controllers/users/editUser')
const {removeUser} = require('../controllers/users/removeUser')
const middleware = require('../middlewares/middle_users')
const {validatePrivilege} = require('../middlewares/validatePrivilege')

router.post('/login', login)
router.post('/signup', middleware.validateFields, middleware.findDuplicate, middleware.validateEmailRegex, addUser)
router.get('/', getUsers)
router.put('/', validatePrivilege, middleware.validateEditFields, middleware.findDifferences, middleware.validateEmailRegex, editUser)
router.delete('/', validatePrivilege, removeUser)


module.exports = router