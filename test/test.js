var request = require('supertest');
// var require = require('really-need')

describe('GET /login/facebook/callback', function () {
  var server;
  beforeEach(function () {
    server = require('../app', { bustCache: true });
  });

  it('returns 200', function testSlash(done) {
    request(server)
      .get('/login/facebook/callback')
      .expect(200, done);
  });
});
