const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jsonToken = require('jsonwebtoken')

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

const User = mongoose.model('User', userSchema)//convert the schema to a model --- mongoose.model(modelName, schema)

userSchema.pre('save', function(next){
    var user = this  //"this" inside of a pre-save hook is the document that is about to be saved

    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})

userSchema.methods.comparePassword = function(enteredPassword,cb) {
    bcrypt.compare(enteredPassword,this.password, function(err, isMatch){
        console.log(enteredPassword, this.password)
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(){

}

module.exports = { User }
