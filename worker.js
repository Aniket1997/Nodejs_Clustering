const { parentPort } = require('worker_threads');

parentPort.on('message', () => {
  let total = 0;

  // Simulate a CPU-intensive task
  for (let i = 0; i < 5_000_000; i++) {
    total++;
  }

  // Send the result back to the main thread
  parentPort.postMessage(total);
});
