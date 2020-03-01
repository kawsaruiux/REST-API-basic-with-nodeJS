const express = require('express')

const router = express.Router()

//import controller
const userController = require('../controllers/userController')


//Login
router.post('/login', userController.loginUserController)

//Register
router.post('/register', userController.registerUserController)

//GET all user
router.get('/', userController.getAllRegisteredUser)


module.exports = router
