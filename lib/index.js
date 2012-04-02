//
// index.js
//
// This is a module that helps wrap connect-style middlewares for compatibility
// with flatiron, particularly for use with director and with 
// `flatiron.plugins.http`.
//

exports.middleware = createBroomstick;

exports.middleware.attach = attachMiddleware;

exports.configurable = function (config) {
  return function equipped () {
    return createBroomstick(config.apply(null, arguments));
  }
};

exports.configurable.attach = attachConfig;

function attachMiddleware (middleware) {
  if (!this.http) {
    throw new Error('You are trying to equip a middleware without the http plugin!');
  }
  else {
    // Let's just add the middleware to the "before" middleware stack.
    this.http.before.push(middleware);
  }
}

function attachConfig (config, options) {
  var argv = [].slice.call(arguments),
      config = argv.shift();

  if (!this.http) {
    throw new Error('You are trying to equip a middleware without the http plugin!');
  }
  else {
    // Let's just add the middleware to the "before" middleware stack.
    this.http.before.push(config.apply(null, argv));
  }
}


// Call the export as a function to create a broomstick-like director route
// that falls back to middleware mode barring the existence of `this.req` and
// `this.res`
function createBroomstick (middleware) {

  var self = this || {},
      broomstick = function (req, res, next) {

    // Deal with the case where we're using director.
    if (self.req && self.res) {
      return middleware(self.req, self.res, function () { self.res.emit('next'); });
    }
    else {
      // Use the regular middleware otherwise.
      return middleware(req, res, next);
    }
  };

  return broomstick;
}
