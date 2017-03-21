var express = require('express')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var encoder = require('../helpers/encoder')()
var router = express.Router()

router.post('/', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      //@todo log

      res.status(400).json({
        message: 'Authentication failed. Your email and password do not match our records'
      })
    } else {
      encoder
        .compare(req.body.password, user.password)
        .then(function (isValid) {
          if (isValid !== true) {
            //@todo log

            res.status(400).json({
              message: 'Authentication failed. Your email and password do not match our records'
            })
          } else {
            //@todo log

            var json = user.toJSON({ virtuals: true })

            var token = jwt.sign(json, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN || 60 * 60 * 24
            })

            res.json({
              token: token
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  })
})

module.exports = router
