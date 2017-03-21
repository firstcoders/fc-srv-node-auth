var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var router = express.Router()
require('dotenv').config()

// =======================
// configuration
// =======================
mongoose.connect(process.env.DATABASE)

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))
app.use(require('./middlewares/user'))

// =======================
// setup routes
// =======================
router.use('/ping', require('./routes/ping'))
router.use('/login', require('./routes/login'))
router.use('/users', require('./routes/user'))
app.use(router)

// =======================
// start the server
// =======================
app.listen(process.env.PORT)
console.log('Magic happens at http://localhost:' + process.env.PORT)

// for testing
module.exports = app
