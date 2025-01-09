const cluster = require('cluster');
const os = require('os');
const path = require('path');

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Restart workers if they exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Restarting...`);
    cluster.fork();
  });
} else {
  // Workers run the actual server code
  require(path.join(__dirname, 'server.js'));
}
