var User = require('../models/user');
var jwt  = require('jsonwebtoken');

module.exports = function(req, res, next) {
    var token = req.headers['authorization'].replace('Bearer', '').trim();

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                next();
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                req.user = decoded;
                next();
            }
        });
    } else {
        next();
    }
}