var express = require('express')
var User = require('../models/user')
var auth = require('../middlewares/auth')
var router = express.Router()

router.get('/', auth, function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err
    res.json(users)
  })
})

router.get('/:id', auth, function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) throw err
    res.json(user)
  })
})

//create a new user
router.post('/', auth, function (req, res) {
})

//edit a user
router.put('/:id', auth, function (req, res) {
})

//delete a user
router.delete('/:id', auth, function (req, res) {
})

// router.get('/setup', function (req, res) {
//   var encoder = require('../helpers/encoder')()

//   encoder.encode('password').then(function (err, hash) {
//     if (err) throw err

//     var user = new User({
//       username: 'mark@firstcoders.co.uk',
//       password: hash,
//       roles: ['ROLE_ADMIN']
//     })

//     // save the sample user
//     user.save(function (err) {
//       if (err) throw err

//       console.log('User saved successfully')
//       res.json({ success: true })
//     })
//   })
// })

module.exports = router
