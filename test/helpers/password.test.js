var User = require('../../models/user')
var mockery = require('mockery')
var sinon = require('sinon')
var expect = require('chai').expect
var password

var mockProducer = () => {
  return {
    send: (data, done) => {
      done()
    }
  }
}

describe('Password forgot', () => {
  before((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    })
    mockery.registerMock('../helpers/producer', mockProducer)
    password = require('../../helpers/password')
    done()
  })

  it('generate a password reset token and instruct the mail service to send the password reset email', (done) => {
    var edmund = {
      username: 'edmundblackadder@home.nl',
      password: 'password',
      roles: ['ROLE_ADMIN'],
      resetToken: 'ABCD01234',
      failedLoginAttempts: 9,
      save: () => {},
      toJSON: () => sinon.spy()
    }

    var stub = sinon.stub(edmund, 'save')
    stub.callsArg(0)

    password.forgot(edmund, () => {
      expect(edmund.resetPasswordToken.length).to.be.above(10)
      done()
    })
  })

  after((done) => {
    mockery.disable()
    done()
  })
})
