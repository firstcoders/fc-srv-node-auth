module.exports = function (err, req, res, next) {
  if (err.errors) {
    res.status(400).send({ errors: err.errors })
  }
  next()
}
