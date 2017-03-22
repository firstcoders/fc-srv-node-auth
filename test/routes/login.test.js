var chai = require('chai')
var chaiHttp = require('chai-http')
var mongoose = require('mongoose')
var mockUsers = require('../mock/users')
var app = require('../../main')
var expect = require('chai').expect

chai.use(chaiHttp)

function mockUser (user) {
  mongoose.models.User.findOne = (params, callback) => {
    callback(null, user)
  }
}

describe('Login', () => {
  it('Should respond with a 400 and an error message if the user is not found', (done) => {
    mockUser(mockUsers.edmund)

    chai.request(app)
    .post('/login')
    .send({ username: 'queenie@home.nl', password: 'thisisthewrongpassword' })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.ownProperty('message')
      done()
    })
  })

  it('Should respond with a 400 and an error message if the wrong password is submitted', (done) => {
    mockUser(mockUsers.edmund)

    chai.request(app)
    .post('/login')
    .send({ username: 'edmundblackadder@home.nl', password: 'thisisthewrongpassword' })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.ownProperty('message')
      done()
    })
  })

  it('Should respond wth an encoded jwt token', (done) => {
    mockUser(mockUsers.edmund)

    chai.request(app)
    .post('/login')
    .send({ username: 'edmundblackadder@home.nl', password: 'password' })
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.ownProperty('token')
      done()
    })
  })
})
