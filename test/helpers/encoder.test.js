var encoder = require('../../helpers/encoder')
var expect = require('chai').expect

describe('Encoding a password', () => {
  it('it should encode a string', (done) => {
    encoder.encode('password').then((hash) => {
      expect(hash).not.to.be.undefined
      done()
    })
  })

  it('it should compare two strings', (done) => {
    encoder.compare('password', 'someotherpassword').then((isValid) => {
      expect(isValid).to.be.false
      done()
    })
  })
})
