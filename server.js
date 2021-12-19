const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./mock/db.js')());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

console.log('JSON Server is running');

server.listen(port);
