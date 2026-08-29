'use strict';

const assert = require('node:assert/strict');
const http = require('node:http');
const { afterEach, beforeEach, test } = require('node:test');
const { createHandler } = require('../src/app');

let baseUrl;
let server;

beforeEach(async () => {
  server = http.createServer(createHandler());
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterEach(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test('GET /health confirma que la API está disponible', async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: 'ok' });
});

test('permite crear, listar, actualizar y eliminar una tarea', async () => {
  const createResponse = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Estudiar la Unidad IV' })
  });
  const createdTask = await createResponse.json();

  assert.equal(createResponse.status, 201);
  assert.equal(createdTask.title, 'Estudiar la Unidad IV');
  assert.equal(createdTask.completed, false);

  const listResponse = await fetch(`${baseUrl}/tasks`);
  const tasks = await listResponse.json();

  assert.equal(listResponse.status, 200);
  assert.equal(tasks.length, 1);

  const updateResponse = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  });
  const updatedTask = await updateResponse.json();

  assert.equal(updateResponse.status, 200);
  assert.equal(updatedTask.completed, true);

  const deleteResponse = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
    method: 'DELETE'
  });
  const deleteResult = await deleteResponse.json();

  assert.equal(deleteResponse.status, 200);
  assert.equal(deleteResult.task.id, createdTask.id);
});

test('rechaza una tarea sin título', async () => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: false })
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error, 'El título es obligatorio.');
});

test('responde 404 al actualizar una tarea inexistente', async () => {
  const response = await fetch(`${baseUrl}/tasks/999`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  });
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.error, 'Tarea no encontrada.');
});
