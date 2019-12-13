const { spawn } = require('child_process');

function spawnAsPromise(...args) {
  const cmd = spawn(args.shift(), args, {
    stdio: ['pipe', process.stdout, process.stderr],
    shell: true,
  });

  return new Promise((resolve, reject) => {
    cmd.on('exit', (code) => {
      if (code !== 0) reject();
      resolve();
    });
  })
}

module.exports = {
  spawnAsPromise
}
