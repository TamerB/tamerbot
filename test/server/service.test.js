'use strict';

require('should');
const request = require('supertest');
const config = require('../../config');
const service = require('../../server/service')(config);

describe('The express servcie', () => {
  describe('PUT /foo', () => {
    it('should return HTTP 404', (done) => {
      request(service)
        .put('/foo')
        .expect(404, done);
    });
  });
});

describe('PUT /servcie/:intent/:port', () => {
  it('should return HTTP 200 with a valid result', (done) => {
    request(service)
      .put('/service/test/9999')
      .set('X-TAMERBOT-API-TOKEN', config.tamerbotApiToken)
      .set('X-TAMERBOT-SERVICE-TOKEN', 'something')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.result.should.startWith('test at');
        return done();
      });
  });

  it('should return HTTP 403 withNO API token provided', (done) => {
    request(service)
      .put('/service/test/9999')
      .expect(403)
      .end(done);
  });

  it('should return HTTP 400 with no service token provided', (done) => {
    request(service)
      .put('/service/test/9999')
      .set('X-TAMERBOT-API-TOKEN', config.tamerbotApiToken)
      .expect(400)
      .end(done);
  });
});
