var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../main')
var expect = require('chai').expect
var fixtures = require('../fixtures/fixtures')

chai.use(chaiHttp)

var models

beforeEach(function (done) {
  models = fixtures.load((err, docs) => {
    if (err) throw err
    models = docs
    done()
  })
})

describe('Get users', () => {
  it('it should respond with a 401 if the user is unauthorized', (done) => {
    chai.request(app)
    .get('/users')
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(401)
      // expect(res.body).to.be.null
      done()
    })
  })

  it('it should respond with serialized users when logged in', (done) => {
    chai.request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .set('X-AUTH-IDENTITY', '{ id: 1 }')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.instanceof(Array)
      expect(res.headers.link).not.to.be.undefined
      expect(res.headers.link).not.to.be.undefined
      expect(res.headers['x-total-count']).not.to.be.undefined
      done()
    })
  })

  it('it should respond with a 404 when requesting with an unsupported accept header', (done) => {
    chai.request(app)
    .get('/users')
    .set('Accept', 'unsopported')
    .set('X-AUTH-IDENTITY', '{ id: 1 }')
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(404)
      done()
    })
  })
})

describe('Get single user', () => {
  it('it should respond with a 401 if the user is unauthorized', (done) => {
    chai.request(app)
    .get('/users/' + models[0]._id)
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(401)
      // expect(res.body).to.be.null
      done()
    })
  })

  it('it should respond with serialized users when logged in', (done) => {
    chai.request(app)
    .get('/users/' + models[0]._id)
    .set('X-AUTH-IDENTITY', '{ id: 1 }')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.instanceof(Object)
      done()
    })
  })

  it('it should respond with a 404 when requesting with an unsupported accept header', (done) => {
    chai.request(app)
    .get('/users/edmundblackadder@home.nl')
    .set('X-AUTH-IDENTITY', '{ id: 1 }')
    .set('Accept', 'unsopported')
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(404)
      done()
    })
  })
})

describe('Create user', () => {
  it('it should respond with a 401 if the user is unauthorized', (done) => {
    chai.request(app)
    .post('/users')
    .send({
      username: 'flashheart@home.nl',
      password: 'lookatmymachinery!'
    })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(401)
      expect(res.body).not.to.have.ownProperty('data')
      done()
    })
  })

  it('it should respond with a 400 if the data is invalid', (done) => {
    chai.request(app)
    .post('/users')
    .set('X-AUTH-IDENTITY', '{ id: 1, username: \'\' }')
    .send({
      // no username
      password: 'lookatmymachinery!'
    })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.ownProperty('errors')
      done()
    })
  })

  it('it should respond with a 201 and the resource location if the user was created', (done) => {
    chai.request(app)
    .post('/users')
    .set('X-AUTH-IDENTITY', '{ id: 1, username: \'\' }')
    .send({
      username: 'flashheart@home.nl',
      password: 'lookatmymachinery!',
      roles: ['ROLE_ADMIN']
    })
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      expect(res.header).to.have.ownProperty('location')
      expect(res.header.location).to.contain('/users/flashheart%40home.nl')
      done()
    })
  })
})

describe('Delete a user', () => {
  it('it should delete the user', (done) => {
    chai.request(app)
    .delete('/users/' + models[0]._id)
    .set('X-AUTH-IDENTITY', '{ id: 1, username: \'\' }')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(204)
      done()
    })
  })
})

describe('Forgot password', () => {
  it('Should return a 400 if invalid data is sent', (done) => {
    chai.request(app)
    .patch('/users/' + models[0]._id)
    .send({
      password: 'fdfdfd'
    })
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })

  it('Unset the password should return a 204 when succesfull', (done) => {
    chai.request(app)
    .patch('/users/' + models[0]._id)
    .send({
      password: null
    })
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(204)
      done()
    })
  })
})
