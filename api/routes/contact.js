
const express = require('express')

const router = express.Router() //এই router use করে route গুলো তৈরি করবো

const authenticate = require('../middleware/authenticate')

//import contactController model from contactController.js 
const contactController = require('../controllers/contactController')

// Get
router.get('/', contactController.getAllContactController)

// Post
router.post('/', authenticate, contactController.postNewContactController)

// Single Get
router.get('/:id', contactController.getSinglePostController)

//Put
router.put('/:id', authenticate, contactController.putController)

//Delete
router.delete('/:id', authenticate, contactController.deleteController)

// router টাকে export করে দিলাম (main file e এটা import করতে হবে)
module.exports = router

