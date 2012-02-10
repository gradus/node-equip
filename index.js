function createBroomstick (middleware) {
  var self = this || {};

  return function broomstick (req, res, next) {

    // Deal with the case where we're using director.
    if (self.req && self.res) {
      return middleware(self.req, self.res, function () { self.res.emit('next'); });
    }
    else {
      return middleware(req, res, next);
    }
  };
}

function createPlugin () {
  var plugin = createBroomstick;
 
  plugin.attach = function (middleware) {
    if (!this.http) {
      throw new Error('You are trying to equip a middleware without the http plugin!');
    }
    else {
      // Let's just add the middleware to the "before" middleware stack.
      this.http.before.concat(middleware);
    }
  }

  return plugin;

};

module.exports = createPlugin();
