'use strict';

const http = require('node:http');
const { createHandler } = require('./app');

const port = Number(process.env.PORT || 8080);
const server = http.createServer(createHandler());

server.listen(port, '0.0.0.0', () => {
  console.log(`API de tareas disponible en http://localhost:${port}`);
});

function closeServer(signal) {
  console.log(`Se recibió ${signal}. Cerrando el servidor...`);
  server.close(() => process.exit(0));
}

process.on('SIGTERM', () => closeServer('SIGTERM'));
process.on('SIGINT', () => closeServer('SIGINT'));
