var express = require('express');
var bcrypt  = require('bcryptjs');
var jwt     = require('jsonwebtoken');
var User    = require('../models/user');
var router  = express.Router();

router.post('/', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.status(400).json({
                message: 'Authentication failed. User not found.'
            });
        } else {
            if (user) {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(function(isValid) {
                        if (isValid !== true) {
                            res.status(400).json({
                                message: 'Authentication failed. Wrong password.'
                            });
                        } else {
                            var json = user.toJSON({ virtuals: true });

                            var token = jwt.sign(json, process.env.JWT_SECRET, {
                                expiresIn: 60*60*24
                            });

                            res.json({
                                token: token
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                ;
            }
        }
    });
});

module.exports = router;