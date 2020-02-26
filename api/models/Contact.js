const mongoose = require('mongoose')
const validate = require('validator')

const Schema = mongoose.Schema


const contactSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return validate.isEmail(v)
            },
            message: `${v} this email used before`
        }
    }
})

//create model
const Contact = mongoose.model('Contact', contactSchema)

Contact = module.exports
