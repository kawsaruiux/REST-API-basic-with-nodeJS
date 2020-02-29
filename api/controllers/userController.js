
const bcrypt = require('bcrypt')  //for hash the plain password 

const User = require('../models/User')


//for register user
const registerUserController = (req, res, next) => {
    //auto-gen a salt and hash
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json({
                error: err
            })
        }
        //create new user using User() Model (কারন database এ আমরা hash হওয়া pasword টা save করবো normal passwordনা)
        let user = new User({
            email: req.body.email,
            password: hash
        }) 

        //save it to the database 
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Registration Succesfull',
                    user: result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    })
}


//for find all the registered user
const getAllRegisteredUser = (req, res, next) => {
    User.find()
        .then(result => {
            res.status(201).json({
                message: 'All registered user',
                user: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurs',
                error: err
            })
        })
}


module.exports = {
    registerUserController,
    getAllRegisteredUser
}