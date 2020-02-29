
const mongoose = require('mongoose')
const validate = require('validator')

const Schema = mongoose.Schema

//Create Schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (v) => {
                return validate.isEmail(v)
            },
            message: '{VALUE} this email used before'
        }
    },
    password: String
})

//Create model
const User = mongoose.model('User', userSchema)
//Export
module.exports = User