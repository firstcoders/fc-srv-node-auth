// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./app/models/user');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//additional
var bcrypt = require('bcryptjs');

// =======================
// routes ================
// =======================
// basic route
// app.get('/', function(req, res) {
//     res.send('Hello! The API is at http://localhost:' + port + '/api');
// });

// API ROUTES -------------------
// we'll get to these in a second

app.get('/setup', function(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash("password", salt, function(err, hash) {
          var user = new User({
            username: 'mark@firstcoders.co.uk',
            password: hash,
            admin: true
          });

          // save the sample user
          user.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
          });
      });
  });
});


// var routes = express.Router();

// route to show a random message (GET http://localhost:8080/api/)
app.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

app.post('/login', function(req, res) {

  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.status(400);
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      bcrypt.compare(req.body.password, user.password, function(err, res2) {
        // check if password matches
        // if (user.password != hash) {
        if (res2 !== true) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 60*60*24
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      });

    }

  });
});

// apply the routes to our application with the prefix /api
// app.use('/', routes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);