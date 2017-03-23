var chai = require('chai')
var links = require('../../helpers/links')
var expect = require('chai').expect

describe('Links', () => {
  var mockRes = { protocol: 'http', get: (v) => { return 'greatboozeup.com' }}

  it('it should return a hash with pagination links', (done) => {
    var testcases = [{
        data: {
            offset: 10,
            limit: 10,
            total: 105
        },
        expectations: {
           self: '/users?offset=10',
           prev: '/users?offset=0',
           next: '/users?offset=20',
           last: '/users?offset=100',
           first: '/users?offset=0'
        }
    }, {
        data: {
            offset: 15,
            limit: 5,
            total: 21
        },
        expectations: {
           self: '/users?offset=15',
           prev: '/users?offset=10',
           next: '/users?offset=20',
           last: '/users?offset=20',
           first: '/users?offset=0'
        }
    }]

    testcases.forEach((testcase) => {
        var result = links(mockRes, testcase.data)

        expect(result.self).to.contains(testcase.expectations.self)
        expect(result.prev).to.contains(testcase.expectations.prev)
        expect(result.next).to.contains(testcase.expectations.next)
        expect(result.last).to.contains(testcase.expectations.last)
        expect(result.first).to.contains(testcase.expectations.first)
    })

    done()
  })
})
