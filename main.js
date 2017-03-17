var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var router = express.Router();
require('dotenv').config()

// =======================
// configuration
// =======================
mongoose.connect(process.env.DATABASE);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// setup routes
// =======================
router.use('/login', require('./controllers/login'))
router.use('/users', require('./controllers/user'))
app.use(router)

// =======================
// start the server
// =======================
app.listen(process.env.PORT);
console.log('Magic happens at http://localhost:' + process.env.PORT);