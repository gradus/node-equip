//
// index.js
//
// This is a module that helps wrap connect-style middlewares for compatibility
// with flatiron, particularly for use with director and with 
// `flatiron.plugins.http`.
//

// This function can be used as an .attach method for broadway deliciousness.
function equip (middleware) {
  if (!this.http) {
    throw new Error('You are trying to equip a middleware without the http plugin!');
  }
  else {
    // Let's just add the middleware to the "before" middleware stack.
    this.http.before.concat(middleware);
  }
}


// Call the export as a function to create a broomstick-like director route
// that falls back to middleware mode barring the existence of `this.req` and
// `this.res`;
var plugin = module.exports = function createBroomstick (middleware) {

  var self = this || {},
      broomstick = function broomstick (req, res, next) {

    // Deal with the case where we're using director.
    if (self.req && self.res) {
      return middleware(self.req, self.res, function () { self.res.emit('next'); });
    }
    else {
      // Use the regular middleware otherwise.
      return middleware(req, res, next);
    }
  };

  // 
  broomstick.attach = equip;
}

// Also expose an "attach" plugin that will dump it into your middleware stack.
plugin.attach = equip;
