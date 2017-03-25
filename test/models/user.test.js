var expect = require('chai').expect
var fixtures = require('../fixtures/fixtures')

var models

beforeEach(function (done) {
  models = fixtures.load((err, docs) => {
    if (err) throw err
    models = docs
    done()
  })
})

describe('The user model', () => {
  describe('Serializing a user model', () => {
    it('it should only serialize certain properties', (done) => {
      var user = models[0].toJSON()
      expect(user.id).not.to.be.undefined
      expect(user._id).to.be.undefined
      expect(user._v).to.be.undefined
      expect(user.username).to.be.undefined
      expect(user.password).to.be.undefined
      expect(user.resetToken).to.be.undefined
      done()
    })
  })

  describe('Storing a password', () => {
    it('it should encode the password when it is updated', (done) => {
      var oldPassword = models[0].password

      models[0].password = 'tenlittlegoblins'

      models[0].save(function (err) {
        if (err) throw err
        expect(models[0].password).to.not.to.equal(oldPassword)
        done()
      })
    })
  })
})
