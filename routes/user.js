var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var router = express.Router()

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

router.get('/:username', auth, function (req, res) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) throw err
    res.json({
      data: user
    })
  })
})

// create a new user
router.post('/', auth, function (req, res) {
})

// edit a user
router.put('/:id', auth, function (req, res) {
})

// delete a user
router.delete('/:id', auth, function (req, res) {
})

// tmp
router.get('/setup', function (req, res) {
  var user = new User({
    username: 'mark@firstcoders.co.uk',
    password: 'password',
    roles: ['ROLE_ADMIN']
  })

  // save the sample user
  user.save(function (err) {
    if (err) throw err
    res.json({ success: true })
  })
})

module.exports = router
