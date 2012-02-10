var vows = require('vows'),
    assert = require('assert'),
    request = require('request');

var equip = require('../lib');

var flatiron = require('flatiron');

var middleware = function oilpan (req, res, next) {
  res.writeHead(500, { 'content-type': 'text/plain' });
  res.end('This request "fell through" the middleware stack!');
}

vows.describe('equip').addBatch({
  'When you equip a flatiron app with a middleware ': {
    'as an argument': {
      topic: function () {
        var cb = this.callback.bind(this);

        var app = new flatiron.App;

        app.use(flatiron.plugins.http);
        app.use(equip, middleware);

        app.start(9000, function (err) {
          cb(err, app);
        });
      },
      'The middleware should activate.': function (app) {
        request('http://localhost:9000', function (err, response, body) {
          assert.equal(response.statusCode, 500);

          assert.equal(body, 'This request "fell through" the middleware stack!');
        });
      }
    },
    'as a wrapper': {
      topic: function () {
        var cb = this.callback.bind(this);

        var app = new flatiron.App;

        app.use(flatiron.plugins.http);
        app.use(equip(middleware));

        app.start(9001, function (err) {
          cb(err, app);
        });
      },
      'The middleware should activate.': function (app) {
        request('http://localhost:9001', function (err, response, body) {
          assert.equal(response.statusCode, 500);

          assert.equal(body, 'This request "fell through" the middleware stack!');
        });
      }
    },
    'as a route /foo': {
      topic: function () {
        var cb = this.callback.bind(this);

        var app = new flatiron.App;

        app.use(flatiron.plugins.http);
        app.router.on('/foo', equip(middleware));

        app.start(9002, function (err) {
          cb(err, app);
        });
      },
      'The middleware should activate on /foo': function (app) {
        request('http://localhost:9002/foo', function (err, response, body) {
          assert.equal(response.statusCode, 500);

          assert.equal(body, 'This request "fell through" the middleware stack!');
        });
      }
    },
  },
  'When using as a regular middleware': {
    topic: function () {
      var req = {},
          res = {},
          topic = this;

      res.end = function () {
        topic.callback.apply(topic,
          [null].concat(Array.prototype.slice.call(arguments))
        );
      };

      // NoOp for now.
      res.writeHead = function () {};

      var equipped = equip(middleware);

      equipped(req, res, function () {});
    },
    'works as expected': function (body) {
      assert.equal(body, 'This request "fell through" the middleware stack!'); 
    }
  }
}).export(module);
