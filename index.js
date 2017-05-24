const {httpServer, httpsServer} = require('./server');
const {handlers} = require('./repl');

// repl command handlers
// homework: https://github.com/kriskowal/q/tree/v2#introduction
// homework: https://www.npmjs.com/package/require-directory

handlers.start = () => new Promise((resolve, reject) =>
  httpServer.init(err =>
    err ? reject(err) : httpsServer.init(err =>
      err ? reject(err) : resolve()
    )
  )
);

handlers.stop = () => new Promise((resolve, reject) =>
  httpServer.destroy(err =>
    err ? reject(err) : httpsServer.destroy(err =>
      err ? reject(err) : resolve()
    )
  )
);

handlers.restart = () => handlers.start().then(handlers.stop);