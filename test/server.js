var flatiron = require('flatiron');

module.exports = function (attach, opts) {
  return function topic() {
    var cb = this.callback.bind(this),
        app = new flatiron.App,
        port = opts.port || 8080;

    app.use(flatiron.plugins.http);
    app.use(function () {
      return attach.apply(null, this, arguments);
    });

    app.start(port, function (err) {
      cb(err, app);
    });

  };
}
