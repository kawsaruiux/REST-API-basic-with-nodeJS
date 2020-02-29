
const Contact = require('../models/Contact')

//for get
const getAllContactController = (req, res, next) => {

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
}

//for post
const postNewContactController = (req, res, next) => {

     //take data for store
     const contact = new Contact({
         name: req.body.name,
         phone: req.body.phone,
         email: req.body.email
     })

     //save data to database 
     contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact added succesfully',
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occurs',
                error: err
            })
        })
}


//for single contact
const getSinglePostController = (req, res, next) => {

    let id = req.params.id
    // console.log(`URL PARAMS = ${id}`)  //id টা পেয়েছে কি না তা cneck করা 
    // next()
    Contact.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error occurs',
                error: err
            })
        })
}

//for delete contact 
const deleteController = (req, res, next) => {

    let id = req.params.id

    Contact.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: 'Delete Succesfull',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occurs',
                error: err
            })
        })
}

//for put(update) contact
const putController = (req, res, next) => {

    let id = req.params.id

    let updateContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    Contact.findByIdAndUpdate(id, {$set: (updateContact)})
        .then(contact => {
            Contact.findById(contact._id)  //data update হবার পর সেই updated data টা নিলাম 
                .then(newContactIsResponse => {
                    res.json({
                        message: 'Update Succesfully',
                        newContactIsResponse
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occurs',
                error: err
            })
        })
}

module.exports = {
    getAllContactController,
    postNewContactController,
    getSinglePostController,
    deleteController,
    putController
}