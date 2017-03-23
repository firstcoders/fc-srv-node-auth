module.exports = function(result) {
    var links = {}

    console.log(result)

    links.self = 'users?offset=' + result.offset
    links.prev = '/users?offset=20'
    links.next = '/users?offset=20'
    links.last = '/users?offset=20'
    links.first = '/users?offset=20'

    return links;
}
