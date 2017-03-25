var User = require('../../models/user')
var mongoose = require('mongoose')
var async = require('async')

var fixtures = {
  clear: (done) => {
    mongoose.connection.collections['users'].drop((err) => {
      if (err) throw err
      done()
    })
  },
  load: (done) => {
    fixtures.clear(() => {
      var edmund = new User({
        username: 'edmundblackadder@home.nl',
        password: 'password',
        roles: ['ROLE_ADMIN'],
        resetToken: 'ABCD01234',
        failedLoginAttempts: 9
      })

      var baldrick = new User({
        username: 'baldricksodoff@home.nl',
        password: 'someotherpassword',
        roles: ['ROLE_ADMIN']
      })

      async.eachSeries([edmund, baldrick], (user, asyncdone) => {
        user.save(asyncdone)
      }, (err) => {
        if (err) throw err
        done(null, [edmund, baldrick])
      })
    })
  }
}

module.exports = fixtures
