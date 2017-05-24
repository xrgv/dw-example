const fs = require('fs');
const path = require('path');

exports.staticDir = path.join(__dirname, '..', 'static');

exports.ssl = {
  key: fs.readFileSync('config/server.key'),
  cert: fs.readFileSync('config/server.crt')
};

exports.host = 'localhost';
exports.httpPort = 80;
exports.httpsPort = 443;