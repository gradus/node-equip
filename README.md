# equip

**Equip connect middlewares to your flatiron stack.**
[![Build Status](https://secure.travis-ci.org/jesusabdullah/node-equip.png?branch=master)](http://travis-ci.org/jesusabdullah/node-equip)

## Flatiron plugin example:

```js
var equip = require('equip');

var flatiron = require('flatiron'),
    app = flatiron.app;

var hello = equip.configurable(function (world) {
  return function (req, res, next) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello %s!', world);
  }
});

app.use(flatiron.plugins.http);
app.use(hello, 'world');

app.start(8080);
```

## Install:

    npm install equip

## API:

### `equip.middleware`

Wrap middlewares for use with flatiron:

```js
var equipped = equip.middleware(someMiddleware);
```

#### Flatiron plugin:

```js
flatironApp.use(equipped);
```

#### Flatiron route handler:

```js

flatironApp.router.get('*', equipped);
```

#### Regular middleware

```js
expressApp.use(equipped);
```

### `equip.configurable`

You can also wrap *functions that return middlewares*, here called a "configurable":

    var equipable = equip.configurable(someConfigurable);


#### Flatiron plugin:

```js
flatironApp.use(equipable, options);
```

#### Flatiron route handler:

```js

flatironApp.router.get('*', equipable(options));
```

#### Regular middleware

```js
expressApp.use(equipable(options));
```

# Tests

```bash
$ npm test
```

# License:

MIT/X11.
