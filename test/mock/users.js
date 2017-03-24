var User = require('../../models/user')

module.exports = {
  edmund: new User({
    username: 'edmundblackadder@home.nl',
    password: '$2a$10$0EvNIlbgBM1oRozLbw6w4OoD32j5NC5gnFgCS/uvMZ05yAg7R86xG',
    roles: ['ROLE_ADMIN'],
    resetToken: 'ABCD01234',
    failedLoginAttempts: 9
  }),
  baldrick: new User({
    username: 'baldricksodoff@home.nl',
    password: 'someotherpassword',
    roles: ['ROLE_ADMIN']
  })
}
