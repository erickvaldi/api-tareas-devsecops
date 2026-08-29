'use strict';

class TaskStore {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  list() {
    return this.tasks.map((task) => ({ ...task }));
  }

  create({ title, completed = false }) {
    const now = new Date().toISOString();
    const task = {
      id: this.nextId,
      title,
      completed,
      createdAt: now,
      updatedAt: now
    };

    this.nextId += 1;
    this.tasks.push(task);
    return { ...task };
  }

  update(id, changes) {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      return null;
    }

    if (Object.hasOwn(changes, 'title')) {
      task.title = changes.title;
    }

    if (Object.hasOwn(changes, 'completed')) {
      task.completed = changes.completed;
    }

    task.updatedAt = new Date().toISOString();
    return { ...task };
  }

  remove(id) {
    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const [removedTask] = this.tasks.splice(index, 1);
    return { ...removedTask };
  }
}

module.exports = TaskStore;
