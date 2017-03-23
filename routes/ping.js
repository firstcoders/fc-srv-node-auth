var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  if (req.accepts(['application/json', 'application/vnd.firstcoders.v1+json'])) {
    res.json({ success: true })
  }
})

module.exports = router
