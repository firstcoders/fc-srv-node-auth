var mongoose = require('mongoose')
var encoder = require('../helpers/encoder')

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
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
  failedLoginAttempts: Number
}, {
  timestamps: true
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

  return next()
})

module.exports = mongoose.model('User', schema)
