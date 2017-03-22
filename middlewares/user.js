module.exports = function (req, res, next) {
  if (req.headers['x-auth-identity']) {
    req.user = req.headers['x-auth-identity']
  }

  next()
}
