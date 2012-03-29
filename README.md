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

## Use it like a regular middleware:

```js

var express = require('express');

// Still works.
express.use(equip(middleware));
```

## Or, wrap a [function that returns a middleware]:

```js

var wrapped = equip.wrapFactory(createMiddleware);

express.use(createMiddleware(opts));
app.use(createMiddleware, opts);
app.router.get('*', createMiddleware);

```

# Install:

    npm install equip

# Tests

```bash
$ npm test
```

# License:

MIT/X11.
