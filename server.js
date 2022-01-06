// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(require('./mock/db.js')());
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// console.log('JSON Server is running');

// server.listen(port);
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./mock/db.js')());
const middlewares = jsonServer.defaults();
const express = require('express');
const rateLimit = require('express-rate-limit');
cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

server.use(middlewares);
server.use(router);

app.use(router);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3,
// });

// app.use(limiter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// server.listen(port, () => console.log(`Server running on port ${port}`));

app.listen(port, () => console.log(`Server running on port ${port}`));
