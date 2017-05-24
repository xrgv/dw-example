const readline = require('readline');

// public dictionary of repl handlers
// handler is expected to be a function that returns a promise
const handlers = {};
exports.handlers = handlers;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt('> ');
rl.prompt();
rl.on('line', line => {
  // do we know that command?
  if (handlers[line]) {
    // call the command
    // first argument to `then` is a function for the case when promise completed successfully
    // the second is the same thing for failure
    handlers[line]().then(
      () => rl.prompt(),
      err => console.log(err)
    );
  } else {
    console.log(`No such command: ${JSON.stringify(line)}`);
    rl.prompt();
  }
});