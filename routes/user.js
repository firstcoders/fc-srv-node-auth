var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var links = require('../helpers/links')
var router = express.Router()

// =======================
// Get users
// =======================
router.get('/', auth, function (req, res, next) {
  // @todo handle and validate search params
  var params = {}
  // @todo validate input
  var options = { offset: req.params.offset || 0, limit: req.params.limit || 20 }

  User.paginate(params, options, function (err, result) {
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
router.get('/:id', auth, function (req, res, next) {
  User.findOne({ _id: req.params.id }, function (err, user) {
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
router.post('/', auth, function (req, res, next) {
  var user = new User(req.body)

  user.save(function (err) {
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
router.put('/:username', auth, function (req, res, next) {
  User.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { upsert: true },
    function (err, user) {
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
router.delete('/:username', auth, function (req, res) {
  // @todo
})

module.exports = router
