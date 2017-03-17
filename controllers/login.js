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
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, res2) {
                    if (res2 !== true) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    } else {
                        var token = jwt.sign(user, process.env.JWT_SECRET, {
                            expiresIn: 60*60*24
                        });

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;