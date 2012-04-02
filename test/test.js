var vows = require('vows');

var equip = require('../lib'),
    oilpan = require('./oilpan'),
    server = require('./server'),
    client = require('./client');

vows.describe([
  'Welcome to:',
  '⚡ AN EXHAUSTIVE DEMO OF EQUIP\'S CAPABILITIES',
  '⚡ (which doubles as the tests.)',
  '',
  '  \033[22m> var equipped, equipable;\033[1m'
].join('\n')).addBatch({
  '  >\n  > equipped = equip.middleware(oilpan.middleware);': {
    '\n  > express.use(equipped);\n  >': {
      topic: server(function (app) {
        app.http.before.push(equip.middleware(oilpan.middleware));
      }, { port: 9000 }),
      'Equipped middlewares work as middleware!': client('http://localhost:9000')
    },
    '\n  > app.router.get(\'/foo\', equipped);\n  >': {
      topic: server(function (app) {
        app.router.get('/foo', equip.middleware(oilpan.middleware));
      }, { port: 9001 }),
      'But look! They also work as flatiron route handlers...': client('http://localhost:9001/foo')
    },
    '\n  > app.use(equipped);\n  >': {
      topic: server(function (app) {
        app.use(equip.middleware(oilpan.middleware));
      }, { port: 9002 }),
      '...and as a broadway plugin!': client('http://localhost:9002')
    }
  }
}).addBatch({
  '  >\n  > equipable = equip.configurable(oilpan.configurable);': {
    '\n  > express.use(equipable({}));\n  >': {
      topic: server(function (app) {
        app.http.before.push(equip.configurable(oilpan.configurable)({}));
      }, { port: 9003 }),
      'We can also wrap middleware-returning functions that work with express,': client('http://localhost:9003')
    },
    '\n  > app.router.get(\'/foo\', equipable({}));\n  >': {
      topic: server(function (app) {
        app.router.get('/foo', equip.configurable(oilpan.config)({}));
      }, { port: 9004 }),
      '*and* also with flatiron route handlers...': client('http://localhost:9004/foo')
    },
    '\n  > app.use(equippable, {});\n  >': {
      topic: server(function (app) {
        app.use(equip.configurable(oilpan.config), {});
      }, { port: 9005 }),
      '...and as a flatiron plugin!': client('http://localhost:9005')
    }
  }
}).export(module);
