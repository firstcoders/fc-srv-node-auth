var express = require('express')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var encoder = require('../helpers/encoder')
var router = express.Router()

router.post('/', function (req, res, next) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) return next(err)

    function sendBadRequestResponse() {
      // @todo log
      res.status(400)
      if (req.accepts(['application/json', 'application/vnd.firstcoders.v1+json'])) {
        res.json({ message: 'Authentication failed. Your email and password do not match our records' })
      }
    }

    if (!user) {
      sendBadRequestResponse()
    } else {
      encoder
        .compare(req.body.password, user.password)
        .then(function (isValid) {
          if (isValid !== true) {
            sendBadRequestResponse()
          } else {
            // @todo log

            var json = user.toJSON({ virtuals: true })

            var token = jwt.sign(json, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN || 60 * 60 * 24
            })

            if (req.accepts(['application/json', 'application/vnd.firstcoders.v1+json'])) {
              res.json({ token: token })
            } else if (req.accepts('text/html')) {
              res.send(token)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  })
})

module.exports = router
