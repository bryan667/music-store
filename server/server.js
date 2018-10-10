const express = require ('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express ()
const mongoose = require('mongoose')
require('dotenv').config() //loads environment variables from .env file into process.env

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

//Models
const { User } = require('./models/user')

app.post('/api/users/register', (req, res)=> {
    const user = new User(req.body)

    user.save((err, docs)=> {
        
        if(err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            userdata: docs
        })
    })
})

app.post('/api/users/login', (req, res)=> {

    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess:false, message: 'Login Failed. Email not found'})
        
        user.comparePassword(req.body.password,(err, didItMatch)=>{
            if(!didItMatch) return res.json({loginSuccess:false, message: 'Incorrect Password'})
            
            user.generateTheAwyis((err,user)=> {
                if(err) return res.status(400).json({success:false, err})
                res.cookie('Awyis_aw', user.token).status(200).json({loginSuccess: true})
            })
        })
    })

})

const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`server running on ${port}`)
})

app.get('/', function (req, res) {
    res.send('Hello World')
})