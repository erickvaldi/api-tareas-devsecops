'use strict';

const MAX_BODY_BYTES = 1_000_000;

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

function sendJson(response, statusCode, data) {
  const body = JSON.stringify(data);

  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  response.end(body);
}

async function readJson(request) {
  const chunks = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    receivedBytes += chunk.length;

    if (receivedBytes > MAX_BODY_BYTES) {
      throw new HttpError(413, 'El cuerpo de la solicitud es demasiado grande.');
    }

    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));

    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      throw new HttpError(400, 'El cuerpo debe ser un objeto JSON.');
    }

    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(400, 'El cuerpo contiene JSON inválido.');
  }
}

module.exports = {
  HttpError,
  readJson,
  sendJson
};
