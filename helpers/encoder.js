var bcrypt = require('bcryptjs')

module.exports = {
  encode: function (s, rounds) {
    return bcrypt.hash(s, rounds || 10)
  },
  compare: function (s1, s2) {
    return bcrypt.compare(s1, s2)
  }
}
