'use strict';

const TaskStore = require('./task-store');
const { HttpError, readJson, sendJson } = require('./http-utils');

function parseTaskId(pathname) {
  const match = pathname.match(/^\/tasks\/(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function validateTitle(title) {
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new HttpError(400, 'El título es obligatorio.');
  }

  if (title.trim().length > 120) {
    throw new HttpError(400, 'El título no puede superar 120 caracteres.');
  }

  return title.trim();
}

function validateCompleted(completed) {
  if (typeof completed !== 'boolean') {
    throw new HttpError(400, 'El campo completed debe ser verdadero o falso.');
  }

  return completed;
}

async function createTask(request, response, store) {
  const data = await readJson(request);
  const task = store.create({
    title: validateTitle(data.title),
    completed: Object.hasOwn(data, 'completed')
      ? validateCompleted(data.completed)
      : false
  });

  sendJson(response, 201, task);
}

async function updateTask(request, response, store, taskId) {
  const data = await readJson(request);
  const changes = {};

  if (Object.hasOwn(data, 'title')) {
    changes.title = validateTitle(data.title);
  }

  if (Object.hasOwn(data, 'completed')) {
    changes.completed = validateCompleted(data.completed);
  }

  if (Object.keys(changes).length === 0) {
    throw new HttpError(400, 'Debe enviar title o completed para actualizar.');
  }

  const task = store.update(taskId, changes);

  if (!task) {
    throw new HttpError(404, 'Tarea no encontrada.');
  }

  sendJson(response, 200, task);
}

function deleteTask(response, store, taskId) {
  const task = store.remove(taskId);

  if (!task) {
    throw new HttpError(404, 'Tarea no encontrada.');
  }

  sendJson(response, 200, {
    message: 'Tarea eliminada correctamente.',
    task
  });
}

function setSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
}

function createHandler(store = new TaskStore()) {
  return async function handleRequest(request, response) {
    setSecurityHeaders(response);

    try {
      const url = new URL(request.url, 'http://localhost');
      const { pathname } = url;
      const taskId = parseTaskId(pathname);

      if (request.method === 'GET' && pathname === '/health') {
        sendJson(response, 200, { status: 'ok' });
        return;
      }

      if (request.method === 'GET' && pathname === '/tasks') {
        sendJson(response, 200, store.list());
        return;
      }

      if (request.method === 'POST' && pathname === '/tasks') {
        await createTask(request, response, store);
        return;
      }

      if (request.method === 'PUT' && taskId !== null) {
        await updateTask(request, response, store, taskId);
        return;
      }

      if (request.method === 'DELETE' && taskId !== null) {
        deleteTask(response, store, taskId);
        return;
      }

      throw new HttpError(404, 'Ruta no encontrada.');
    } catch (error) {
      const statusCode = error instanceof HttpError ? error.statusCode : 500;
      const message = statusCode === 500
        ? 'Ocurrió un error interno en el servidor.'
        : error.message;

      sendJson(response, statusCode, { error: message });
    }
  };
}

module.exports = { createHandler };
