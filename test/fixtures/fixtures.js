var User = require('../../models/user')
var eachSeries = require('async/eachSeries')

var fixtures = {
  clear: (done) => {
    User.deleteMany({}, () => {
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

      eachSeries([edmund, baldrick], (user, asyncdone) => {
        user.save(asyncdone)
      }, (err) => {
        if (err) throw err
        done(null, [edmund, baldrick])
      })
    })
  }
}

module.exports = fixtures
