const jsonServer  = require("json-server");
const server  = jsonServer.create();
const route= jsonServer.router("db.json");
const mideleware = jsonServer.defaults();

const port =process.env || 9202;

server.use(mideleware);
server.use(route);
server.listen(port)