var express = require('express');
var User    = require('../models/user');
var router  = express.Router();
var auth    = require('../middlewares/auth');

router.get('/', auth, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.post('/', auth, function(req, res) {
    //validate input
});

// router.get('/setup', function(req, res) {
//   bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash("password", salt, function(err, hash) {
//           var user = new User({
//             username: 'mark@firstcoders.co.uk',
//             password: hash,
//             admin: true
//           });

//           // save the sample user
//           user.save(function(err) {
//             if (err) throw err;

//             console.log('User saved successfully');
//             res.json({ success: true });
//           });
//       });
//   });
// });

module.exports = router;