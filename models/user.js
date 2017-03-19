var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: String,
  password: String,
  roles: [{
    type: String
  }]
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

module.exports = mongoose.model('User', schema)
