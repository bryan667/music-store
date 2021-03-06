const express = require ('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express ()
const mongoose = require('mongoose')
require('dotenv').config() //loads environment variables from .env file into process.env

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

//Models
const {User} = require('./models/user')
const {Brand} = require('./models/brand')
const {Wood} = require('./models/wood')
const {Product} = require('./models/product')

//Middleware
const {auth} = require('./middleware/auth')
const {checkAdmin} = require('./middleware/checkadmin')

//=================================================================
//                          PRODUCTS
//=================================================================

app.post('/api/products/shop', (req,res)=> {
    
    let order = req.body.order ? req.body.order : 'desc'
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'    
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],  //greater than or equal
                    $lte: req.body.filters[key][1]   //less than or equal
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    skip(skip).
    limit(limit).
    exec((err, articles)=> {
        if (err) return res.status(400).send(err)
        res.status(200).json({
            size: articles.length,
            articles
        })
    })

    res.status(200)
})


//fetch with sortBy,order,limit
// /articles?sortBy=sold&order=desc&limit=4&skip=5
app.get('/api/products/articles', (req,res)=> {

    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err, docs)=> {
        if (err) return res.status(400).send(err)
        return res.send(docs)
    })
})


// /api/products/articles_by_id?id=123456,235646,456465
app.get('/api/products/articles_by_id', (req,res)=> {
    let type = req.query.type
    let items = req.query.id

    if(type === 'array') {
        let ids = req.query.id.split(',')
        items = []
        items = ids.map(items => {
            return mongoose.Types.ObjectId(items)
        })
    }

    Product.
    find({'_id':{$in:items}}).
    populate('brand').
    populate('wood').
    exec((err, docs)=> {
        return res.status(200).send(docs)
    })
})

app.post('/api/products/article', auth, checkAdmin, (req, res)=> {
    const product = new Product(req.body)

    product.save((err, doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

//=================================================================
//                          WOODS
//=================================================================

app.post('/api/products/wood', auth, checkAdmin, (req, res)=> {
    const wood = new Wood(req.body)

    wood.save((err, doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({
            success: true,
            wood: doc
        })
    })
})

app.get('/api/products/get_woods', (req, res) => {
    Wood.find({}, (err, woods)=> {
        if (err) return res.status(400).send(err)
        res.status(200).json(woods)
    })
})

//=================================================================
//                          BRANDS
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

app.get('/api/products/get_brands', (req, res) => {
    Brand.find({}, (err, brands)=> {
        if (err) return res.status(400).send(err)
        res.status(200).json(brands)
    })
})



//=================================================================
//                          USERS
//=================================================================

app.get('/api/users/auth', auth, (req, res)=> {

    return res.status(200).json({
        message: 'awyis',
        isAdmin: req.user.role === 1 ? true : false,
        isAuth: true,
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