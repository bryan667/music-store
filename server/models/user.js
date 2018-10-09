const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 30
    },
    cart: {
        type:Array,
        default: []
    },
    history: {
        type:Array,
        default: []
    },
    role:{
        type: Number,
        default: 0  //admin or not
    },
    token:{
        type: String
    }

})

const User = mongoose.model('User', userSchema)

module.exports = { User }
