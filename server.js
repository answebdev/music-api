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
// Heroku: you can’t make more than 4500 Platform API requests per hour
// See: https://devcenter.heroku.com/articles/limits
// Video: https://www.youtube.com/watch?v=mZ0O7gcS7Yk
// Video: https://www.youtube.com/watch?v=iicNZf3eGCI
// Traversy Video: https://www.youtube.com/watch?v=ZGymN8aFsv4

const express = require('express');
const rateLimit = require('express-rate-limit');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./mock/db.js')());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const app = express();

// Put before your path
const limiter = rateLimit({
  // Breaking Bad API:
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 10000
  windowMs: 10 * 60 * 1000, // 10 minutes - when the user reaches the limit, the user will be kicked off for 10 minutes
  max: 8,
  message: 'You sent too many requests 💀 Try again later...',
});

// Apply to all requests
server.use(limiter);

// For Heroku: https://stackoverflow.com/questions/62494060/express-rate-limit-not-working-when-deployed-to-heroku
app.set('trust proxy', 1);
// server.set('trust proxy', 1);

server.use(middlewares);
server.use(router);

console.log('JSON Server is running');

// app.listen(port);
server.listen(port);
