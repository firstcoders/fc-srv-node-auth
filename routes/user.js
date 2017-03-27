var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var links = require('../helpers/links')
var password = require('../helpers/password')
var router = express.Router()

// =======================
// Get users
// =======================
router.get('/', auth, (req, res, next) => {
  // @todo handle and validate search params
  var params = {}
  // @todo validate input
  var options = { offset: req.params.offset || 0, limit: req.params.limit || 20 }

  User.paginate(params, options, (err, result) => {
    if (err) return next(err)

    res
      .links(links(req, result))
      .header('X-total-count', result.total)

    if (req.accepts(['application/json', 'application/vnd.firstcoders.v1+json'])) {
      res.json(result.docs)
      return next()
    }

    next()
  })
})

// =======================
// Get a single user
// =======================
router.get('/:id', auth, (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return next(err)

    if (req.accepts(['application/json', 'application/vnd.firstcoders.v1+json'])) {
      res.json(user)
    }

    next()
  })
})

// =======================
// Create a user
// =======================
router.post('/', auth, (req, res, next) => {
  var user = new User(req.body)

  user.save((err) => {
    if (err) return next(err)

    res
      .status(201)
      .location(req.protocol + '://' + req.get('host') + '/users/' + encodeURIComponent(req.body.username))
      .send()
  })
})

// =======================
// Edit a user
// =======================
router.put('/:username', auth, (req, res, next) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { upsert: true },
    (err, user) => {
      if (err) return next(err)

      res
        .status(204)
        .send()
    }
  )
})

// =======================
// Delete a user
// =======================
router.delete('/:id', auth, (req, res, next) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return next(err)

    res
        .status(204)
        .send()

    next()
  })
})

// =======================
// Forgot password
// =======================
router.patch('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return next(err)

    if (req.body.password === null) {
      password.forgot(user, (err) => {
        if (err) return next(err)

        res
          .status(204)
          .send()
      })
    } else {
      res
        .status(400)
        .send()
    }
  })
})

module.exports = router
