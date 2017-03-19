module.exports = function (req, res, next) {
  if (req.headers['auth-identity']) {
    req.user = req.headers['auth-identity']
  }

  next()
}
