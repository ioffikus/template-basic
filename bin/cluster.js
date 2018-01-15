const cluster = require('cluster');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    console.log(`Worker ${i} started`);
  }

  // Listen for terminating workers
  cluster.on('exit', worker => {
    // Replace the terminated workers
    console.log(`Worker ${worker.id} died :(`);
    cluster.fork();
  });

  // Code to run if we're in a worker process
} else {
  require('./../dist/server/server');
}
