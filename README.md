# equip

**Equip connect middlewares to your flatiron stack.**

## Flatiron plugin example:

```js
var equip = require('equip');

var flatiron = require('flatiron'),
    app = flatiron.app;

var middleware = function oilpan (req, res, next) {
  res.writeHead(500, { 'content-type': 'text/plain' });
  res.end('This request "fell through" the middleware stack!');
}

app.use(flatiron.plugins.http);
app.use(equip, middleware);

app.start(8080);
```

## Alternate use with flatiron:

```js
app.use(equip(middleware));
```

## Alternate use with director:

```js

app.router.get('*', equip(middleware));
```

## Or, use it like a regular middleware:

```js

var express = require('express');

// Still works.
express.use(equip(middleware));
```

# Install:

    npm install equip

# Tests

```bash
% npm test
npm info it worked if it ends with ok
npm info using npm@1.1.0-3
npm info using node@v0.6.6
npm info pretest equip@0.0.0
npm info test equip@0.0.0

> equip@0.0.0 test /home/josh/dev/equip
> vows --spec ./test/test.js


♢ equip

  When using as a regular middleware
    ✓ works as expected
  When you equip a flatiron app with a middleware as an argument
    ✓ The middleware should activate.
  When you equip a flatiron app with a middleware as a wrapper
    ✓ The middleware should activate.
  When you equip a flatiron app with a middleware as a route /foo
    ✓ The middleware should activate on /foo
 
✓ OK » 4 honored (0.053s)

npm info posttest equip@0.0.0
npm info ok
```

# License:

MIT/X11.
