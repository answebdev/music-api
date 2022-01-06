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
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const compression = require('compression');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// compress all responses
app.use(compression());

// server.use(middlewares);
// server.use(router);
app.use(middlewares);
app.use(router);

app.use(router);

app.set('trust proxy', 1);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3,
// });

// app.use(limiter);

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests per windowMs
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

app.get('http://personal-music-api.herokuapp.com/', function (req, res) {
  return res.send('Hello World');
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

// server.listen(port, () => console.log(`Server running on port ${port}`));

// app.listen(port, () => console.log(`Server running on port ${port}`));
