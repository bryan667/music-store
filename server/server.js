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
const {User} = require('./models/user')
const {Brand} = require('./models/brand')

//Middleware
const {auth} = require('./middleware/auth')
const {checkAdmin} = require('./middleware/checkadmin')

//=================================================================
//                      BRAND
//=================================================================

app.post('/api/products/brand', auth, checkAdmin, (req, res)=> {
    const brand = new Brand(req.body)

    brand.save((err, doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})





//=================================================================
//                      USERS
//=================================================================

app.get('/api/users/auth', auth, (req, res)=> {

    return res.status(200).json({
        message: 'awyis',
        isAdmin: req.user.role === 0 ? true : false,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.get('/api/users/logout', auth, (req,res)=> {

    User.findOneAndUpdate(
        {_id: req.user.id},
        {token:''},
        (err, doc)=>{
        if (err) return res.json({success:false, err})
        return res.status(200).send({
            success: true
        })
    })
})

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