var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../main');
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('Ping', () => {
    it('it respond with some json indicating the service is live', (done) => {
        chai.request(app)
            .get('/ping')
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.ownProperty('success');
                expect(res.body.success).to.be.true;
                done()
            })
    })
})