// var encoder = require('../../helpers/encoder')
var expect = require('chai').expect
var mockUsers = require('../mock/users')
// var mongoose = require('mongoose')

describe('The user model', () => {
  describe('Serializing a user model', () => {
    it('it should only serialize certain properties', (done) => {
      var user = mockUsers.edmund.toJSON()
      expect(user.id).not.to.be.undefined
      expect(user._id).to.be.undefined
      expect(user._v).to.be.undefined
      expect(user.username).to.be.undefined
      expect(user.password).to.be.undefined
      expect(user.resetToken).to.be.undefined
      done()
    })
  })

  // describe('Storing a password', () => {
  //   it('it should encode the password when it is updated', (done) => {
  //     mockUsers.edmund.password = 'tenlittlegoblins'

  //     mockUsers.edmund.save(function (err) {
  //       expect(user.password).to.query('somehash')
  //       done()
  //     })
  //   })
  // })
})
