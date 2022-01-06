const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./mock/db.js')());
const middlewares = jsonServer.defaults();
const { RateLimiter } = require('limiter');

const port = process.env.PORT || 3000;

server.use(middlewares);
//server.use(router);

// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
const limiter = new RateLimiter({ tokensPerInterval: 3, interval: 'hour' });

async function sendRequest() {
  // This call will throw if we request more than the maximum number of requests
  // that were set in the constructor
  // remainingRequests tells us how many additional requests could be sent
  // right this moment
  const remainingRequests = await limiter.removeTokens(1);
  callMyRequestSendingFunction(server.use(router));
}

console.log('JSON Server is running');

server.listen(port);

// =======================================================
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(require('./mock/db.js')());
// const middlewares = jsonServer.defaults();
// const express = require('express');
// const bodyParser = require('body-parser');
// const rateLimit = require('express-rate-limit');
// const cors = require('cors');
// const compression = require('compression');
// const port = process.env.PORT || 3000;

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // compress all responses
// app.use(compression());

// // server.use(middlewares);
// // server.use(router);
// app.use(middlewares);
// app.use(router);

// app.use(router);

// app.set('trust proxy', 1);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3,
// });

// app.use(limiter);

// // server.listen(port, () => console.log(`Server running on port ${port}`));

// app.listen(port, () => console.log(`Server running on port ${port}`));
