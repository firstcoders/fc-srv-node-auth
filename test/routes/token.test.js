var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../main')
var expect = require('chai').expect
var fixtures = require('../fixtures/fixtures')

chai.use(chaiHttp)

beforeEach(function (done) {
  fixtures.load((err, docs) => {
    if (err) throw err
    done()
  })
})

describe('Login using username and password', () => {
  it('Should respond with a 400 and an error message if the user is not found', (done) => {
    chai.request(app)
    .post('/tokens')
    .send({ username: 'queenie@home.nl', password: 'thisisthewrongpassword' })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.ownProperty('message')
      done()
    })
  })

  it('Should respond with a 400 and an error message if the wrong password is submitted', (done) => {
    chai.request(app)
    .post('/tokens')
    .send({ username: 'edmundblackadder@home.nl', password: 'thisisthewrongpassword' })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.ownProperty('message')
      done()
    })
  })

  it('Should respond wth an encoded jwt token', (done) => {
    chai.request(app)
    .post('/tokens')
    .set('Accept', 'application/json')
    .send({ username: 'edmundblackadder@home.nl', password: 'password' })
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.ownProperty('accessToken')
      done()
    })
  })
})
