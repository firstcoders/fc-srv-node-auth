var bcrypt = require('bcryptjs')

var encoder = function (rounds) {
  rounds = rounds || 10

  return {
    encode: function (s) {
      return bcrypt.hash(s, rounds)
    },
    compare: function (s1, s2) {
      return bcrypt.compare(s1, s2)
    }
  }
}

module.exports = encoder
