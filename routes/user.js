var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var router = express.Router()

// =======================
// Get a users
// =======================
router.get('/', auth, function (req, res) {
  // @todo paginate
  // @todo search
  User.find({}, function (err, users) {
    if (err) throw err
    res.json({
      data: users
    })
  })
})

// =======================
// Get a single user
// =======================
router.get('/:username', auth, function (req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return next(err)

    res.json({
      data: user
    })
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
      .header('Location', req.protocol + '://' + req.get('host') + '/users/' + encodeURIComponent(req.body.username))
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
router.delete('/:id', auth, function (req, res) {
})

module.exports = router
