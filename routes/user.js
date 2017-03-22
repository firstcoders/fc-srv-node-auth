var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var router = express.Router()

// =======================
// Get a users
// =======================
router.get('/', auth, function (req, res, next) {
  // @todo search
  // @see https://developer.github.com/v3/
  User.paginate({}, { offset: req.params.offset || 0, limit: 20 }, function (err, results) {
    if (err) return next(err)

    var links = {}

    links.self = 'users?offset=' + results.offset
    links.prev = '/users?offset=20'
    links.next = '/users?offset=20'
    links.last = '/users?offset=20'
    links.first = '/users?offset=20'

    res
      .links(links)
      .json(results)
  })
})

// =======================
// Get a single user
// =======================
router.get('/:username', auth, function (req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return next(err)

    res.json(user)
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
})

module.exports = router
