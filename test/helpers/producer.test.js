// var User = require('../../models/user')
var mockery = require('mockery')
var sinon = require('sinon')
var expect = require('chai').expect
var producer

var mockAmqp = {
    connect: (url, done) => { done(null, mockConnection) }
}

var mockConnection = {
    createChannel: (done) => { done(null, mockChannel)  },
    close: (done) => {
      done(null)
    }
}

var mockChannel = {
    assertQueue: sinon.spy(),
    sendToQueue: sinon.spy()
}

describe('Password forgot', () => {
  before((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    })

    mockery.registerMock('amqplib/callback_api', mockAmqp)
    producer = require('../../helpers/producer')('apmq://somewhere', 'myveryspecialqueue')

    done()
  })

  it('should connect, create a queue, send data to the queue and close the connection', (done) => {
    producer.send('abcd', () => {
      expect(mockChannel.assertQueue.calledWith('myveryspecialqueue')).to.be.true
      expect(mockChannel.sendToQueue.calledWith('myveryspecialqueue', new Buffer('abcd'))).to.be.true
      done()
    })
  })

  after((done) => {
    mockery.disable()
    done()
  })
})
