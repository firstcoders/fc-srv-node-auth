var crypto = require('crypto')
var waterfall = require('async/waterfall')
var producer = require('../helpers/producer')(process.env.BROKER_URL, process.env.MAIL_QUEUE || 'v1.mail.send')

module.exports = {
  forgot: (user, finalize) => {
    waterfall([
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString('hex')
          done(err, token)
        })
      },
      (token, done) => {
        user.resetPasswordToken = token + '.' + (Date.now() + 3600000)

        user.save((err) => {
          done(err, token, user)
        })
      },
      (token, user, done) => {
        var message = {
          context: 'auth.forgot_password',
          user: user.toJSON(),
          token: token
        }

        producer.send(JSON.stringify(message), () => {
          done()
        })
      }
    ], finalize)
  }
}
