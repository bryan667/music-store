const express = require ('express')
const bodyParser = require('body-parser')

const app = express ()
const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`server running on ${port}`)
})

app.get('/', function (req, res) {
    res.send('Hello World')
})