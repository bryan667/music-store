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
    res.send(200)    
})


const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`server running on ${port}`)
})

app.get('/', function (req, res) {
    res.send('Hello World')
})