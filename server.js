// ORIGINAL WORKING CODE
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(require('./mock/db.js')());
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// console.log('JSON Server is running');

// server.listen(port);

// =================================================================

const express = require('express');
const rateLimit = require('express-rate-limit');
const res = require('express/lib/response');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./mock/db.js')());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const app = express();

// For Heroku: https://stackoverflow.com/questions/62494060/express-rate-limit-not-working-when-deployed-to-heroku
server.set('trust proxy', 1);

// Put before your path
const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  windowMs: 1000, // 15 minutes
  max: 1,
  message: 'Do NOT SEND so many messages again...it is too many',
});

// Apply to all requests
server.use(limiter);

server.use(middlewares);
server.use(router);

console.log('JSON Server is running');

// app.listen(port);
server.listen(port);
