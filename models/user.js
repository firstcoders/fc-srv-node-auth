var mongoose = require('mongoose')
var paginate = require('mongoose-paginate')
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
  resetPasswordToken: String,
  resetPasswordExpires: Date,
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
    delete ret.username
    delete ret.password
    delete ret.resetPasswordToken
    delete ret.resetPasswordExpires
    return ret
  }
}

schema.pre('save', function (next) {
  var user = this

  if (user.isModified('password')) {
    encoder.encode(user.password).then(function (hash) {
      user.password = hash
      next()
    })
  } else {
    next()
  }
})

schema.plugin(paginate)

module.exports = mongoose.model('User', schema)
