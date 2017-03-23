module.exports = function (req, result) {
  var links = {}

  var base = req.protocol + '://' + req.get('host')

  links.self = base + '/users?offset=' + result.offset
  links.prev = base + '/users?offset=' + (result.offset - result.limit)
  links.next = base + '/users?offset=' + (result.offset + result.limit)
  links.last = base + '/users?offset=' + (result.total - (result.total % result.limit))
  links.first = base + '/users?offset=0'

  return links
}
