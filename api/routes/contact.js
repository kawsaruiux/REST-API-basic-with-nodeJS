
const express = require('express')

const router = express.Router() //এই router use করে route গুলো তৈরি করবো

//import Contact model from Contact.js 
const Contact = require('../models/Contact')

// Get
router.get('/', (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: 'All Contacts',
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err 
            })
        })
})

// Post
router.post('/', (req, res, next) => {

    //take the value for store 
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    //save the value to the database
    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact added successfully',
                contact: data
            })
        })
        .catch(err => {console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err 
            })
        })
})


// router টাকে export করে দিলাম (main file e এটা import করতে হবে)
module.exports = router

