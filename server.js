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
const router = jsonServer.router(require('./mock/db.js')());
const express = require('express');
const rateLimit = require('express-rate-limit'),
  // const app = express();
  app = express();

app.use(router);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
});

app.use(limiter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
