const express = require('express')

const router = express.Router()

//import controller
const userController = require('../controllers/userController')
//import middleware
const authenticate = require('../middleware/authenticate')


//Login
router.post('/login', userController.loginUserController)

//Register
router.post('/register', userController.registerUserController)

//GET all user
router.get('/', authenticate, userController.getAllRegisteredUser)


module.exports = router
