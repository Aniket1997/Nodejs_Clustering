const express = require('express');
const path = require('path');
const { Worker } = require('worker_threads');

const app = express();
const port = 9000;

// Route for heavy computation
app.get('/heavy', (req, res) => {
  const worker = new Worker(path.join(__dirname, 'worker.js'));

  worker.on('message', (result) => {
    res.send(`The result of the CPU-intensive task is ${result}\n`);
  });

  worker.on('error', (err) => {
    res.status(500).send(`Worker error: ${err.message}`);
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });

  worker.postMessage('start'); // Send a message to start computation
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}, worker pid=${process.pid}`);
});
