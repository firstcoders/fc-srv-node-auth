var amqp = require('amqplib/callback_api')
var waterfall = require('async/waterfall')

module.exports = (url, queue) => {
  return {
    send: (data, finalize) => {
      waterfall([
        (done) => {
          amqp.connect(url, (err, conn) => {
            if (err) throw err
            done(null, conn)
          })
        },
        (conn, done) => {
          conn.createChannel((err, channel) => {
            if (err) throw err
            done(null, conn, channel)
          })
        },
        (conn, channel, done) => {
          channel.assertQueue(queue, {durable: false})
          channel.sendToQueue(queue, new Buffer(data))
          conn.close(() => {
            done(null)
          })
        }
      ], finalize)
    }
  }
}
