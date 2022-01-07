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
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.set('trust proxy', 1);

// Put before your path
const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  windowMs: 1000, // 15 minutes
  max: 1,
  message: 'STOP SENDING so many requests',
});

// Apply to all requests
server.use(limiter);

server.use(middlewares);
server.use(router);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './mock/db.js'));
// });

//app.get('/', limiter, (req, res) => res.send('Hello'));
// app.get('*', limiter, (req, res) =>
//   res.send(`https://personal-music-api.herokuapp.com/`)
// );

console.log('JSON Server is running');

// app.listen(port);
server.listen(port);
