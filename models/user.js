var mongoose = require('mongoose')
var encoder = require('../helpers/encoder')()

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String
  }],
  email: String,
  resetToken: String,
  isActive: Boolean,
  createdDate: Date,
  modifiedDate: Date,
  failedLoginAttempts: Number
})

schema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
    return ret
  }
}

schema.pre('save', function (next) {
  var user = this

  if (user.isModified('password')) {
    encoder.encode(user.password).then(function (hash) {
      user.password = hash
    })
  }

  this.modifiedDate = new Date()

  return next()
})

module.exports = mongoose.model('User', schema)
