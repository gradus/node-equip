//
// index.js
//
// This is a module that helps wrap connect-style middlewares for compatibility
// with flatiron, particularly for use with director and with 
// `flatiron.plugins.http`.
//

exports.middleware = createBroomstick;

exports.middleware.attach = attachMiddleware;

exports.configurable = function (configfn) {
  function equipped () {
    var argv = [].slice.call(arguments);
    return createBroomstick(configfn.apply(null, argv));
  }

  equipped.attach = attachConfig(equipped);
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

function attachConfig (middlware) {

  return function () {
    var argv = [].slice.call(arguments),
        app = this;

    if (!app.http) {
      throw new Error('You are trying to equip a middleware without the http plugin!');
    }
    else {
      // Let's just add the middleware to the "before" middleware stack.
      app.http.before.push(middleware.apply(null, argv));
    }
  };
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
