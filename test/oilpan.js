function oilpan (req, res, next) {
  res.writeHead(500, { 'content-type': 'text/plain' });
  res.end('This request "fell through" the middleware stack!');
}

exports.middleware = oilpan;
exports.configurable = function () {
  return oilpan;
}
