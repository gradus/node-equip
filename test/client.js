var request = require('request'),
    assert = require('assert');

module.exports = function client(url) {
  return function (app) {
    request(url, function (err, response, body) {
      assert.equal(response.statusCode, 500);
      assert.equal(body, 'This request "fell through" the middleware stack!');
    });
  };
};

