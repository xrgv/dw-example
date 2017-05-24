const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const enableDestroy = require('server-destroy');

// it's actually index.js in config folder. index files are main files in that sense too
const {ssl, staticDir, httpPort, httpsPort, host} = require('./config');

const app = express();

app.get('/', (req, res) =>
  res.sendFile(path.join(staticDir, 'index.html'))
);
app.use(express.static(staticDir));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(ssl, app);

// keepalive connections are pain in the ass
enableDestroy(httpServer);
enableDestroy(httpsServer);

httpServer.init = cb => httpServer.listen(httpPort, host, cb);
httpsServer.init = cb => httpsServer.listen(httpsPort, host, cb);

exports.httpServer = httpServer;
exports.httpsServer = httpsServer;