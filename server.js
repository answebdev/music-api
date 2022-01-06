// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(require('./mock/db.js')());
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// console.log('JSON Server is running');

// server.listen(port);

// =======================================================
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
});

app.use(limiter);

// GET route to handle the request coming from user
app.get('/https://personal-music-api.herokuapp.com/artists', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from the express server',
  });
});

// server.listen(port, () => console.log(`Server running on port ${port}`));

app.listen(port, () => console.log(`Server running on port ${port}`));
