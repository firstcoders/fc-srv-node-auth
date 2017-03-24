var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../main')
var expect = require('chai').expect
var mongoose = require('mongoose')
var mockUsers = require('../mock/users')

chai.use(chaiHttp)

function setUserFixtures (users) {
  mongoose.models.User.find = (params, callback) => {
    callback(null, users)
  }
}

describe('Get users', () => {
  beforeEach(function (done) {
    mongoose.models.User.paginate = (params, options, callback) => {
      callback(null, {'docs': [{'username': 'mark@firstcoders.co.uk', 'roles': ['ROLE_ADMIN'], 'id': '58cd112803e6c9000f5878ca'}], 'total': 1, 'limit': 20, 'offset': 0})
    }
    done()
  })

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
      expect(res.body).to.be.instanceof(Object)
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
    setUserFixtures([mockUsers.edmund, mockUsers.baldrick])
    chai.request(app)
    .get('/users/' + mockUsers.edmund._id)
    .end(function (err, res) {
      expect(err).not.to.be.null
      expect(res).to.have.status(401)
      // expect(res.body).to.be.null
      done()
    })
  })

  it('it should respond with serialized users when logged in', (done) => {
    setUserFixtures([mockUsers.edmund, mockUsers.baldrick])
    chai.request(app)
    .get('/users/' + mockUsers.edmund._id)
    .set('X-AUTH-IDENTITY', '{ id: 1 }')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.instanceof(Object)
      done()
    })
  })

  it('it should respond with a 404 when requesting with an unsupported accept header', (done) => {
    setUserFixtures([mockUsers.edmund, mockUsers.baldrick])
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
    mongoose.Collection.prototype.insert = function (docs, options, callback) {
      callback(null, docs)
    }

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
