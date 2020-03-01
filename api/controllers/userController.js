
const bcrypt = require('bcrypt')  //for hash the plain password 
const jwt = require('jsonwebtoken') //for keep user information for the surtan time that help user to enter system without login every time

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


//for user login
const loginUserController = (req, res, next) => {

    //first, we will get some data from user
    let email = req.body.email;
    let password = req.body.password;

    //যে email user পাঠাচ্ছে সেটা database এ আছে কিনা সেটা check করতে হবে (in tutorial-15 (27 min))
    User.findOne({email})
        .then(user => {
            if(user) {
                //user এর দেয়া password আর database এর password match করেছে কিনা টা check করতে 'bcrypt.compare' use করা হয়
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            message: 'error occurs'
                        })
                    }

                    //যদি database এ data খুজে পাওয়া যায়
                    if(result){
                        //make a token for the user
                        let token = jwt.sign({email: user.email, _id: user._id}, 'SECRET', {expiresIn: '2h'})

                        res.json({
                            message: 'login Succesfull',
                            token
                        })
                    }
                    else{
                        res.json({
                            message: 'Login Failed. Password don\'t match'
                        })
                    }
                })
            }
            else{
                res.json({
                    message: 'User not found'
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: 'Erron occurs',
                error: err
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
    getAllRegisteredUser,
    loginUserController
}