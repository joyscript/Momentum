import { user, saveUser } from './user.js';
import { checkValue } from './service.js';

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');

const maxHeight = parseInt(getComputedStyle(todoList).maxHeight);

const createTask = (task, isDone) => {
  const element = document.createElement('div');
  element.classList.add('todo-item', 'trans');
  isDone && element.classList.add('done');
  element.innerHTML = `
    <button class="button todo-check-button"></button>
    <div class="todo-task" contenteditable="true">${task}</div>
    <button class="button todo-delete-button"></button>
  `;
  todoList.append(element);
  todoList.style.height = todoList.scrollHeight + 'px';
  element.scrollIntoView();
  setTimeout(() => element.classList.remove('trans'), 200);
};

const checkTodoList = () => {
  todoList.querySelector('.todo-item') ? todoList.classList.remove('empty-all') : todoList.classList.add('empty-all');
  todoList.querySelector('.done') ? todoList.classList.remove('empty-done') : todoList.classList.add('empty-done');
  todoList.scrollHeight > maxHeight ? todoList.classList.add('scroll') : todoList.classList.remove('scroll');
};

const addTask = () => {
  const task = (todoInput.value = checkValue(todoInput.value));
  if (!task) {
    todoInput.blur();
    return;
  }
  createTask(task, user.todoShow === 'done' ? 'done' : '');
  todoInput.value = '';
  checkTodoList();
};

const toggleTask = (item) => {
  item.classList.toggle('done');
  checkTodoList();
};

const deleteTask = (item) => {
  item.style.height = item.offsetHeight + 'px';
  todoList.style.height = todoList.scrollHeight - item.offsetHeight + 'px';
  item.style.cssText = 'height: 0; opacity: 0; padding: 0';
  setTimeout(() => {
    item.remove();
    checkTodoList();
  }, 300);
};

const clearList = () => {
  const selector = user.todoShow === 'done' ? '.todo-item.done' : '.todo-item';
  const items = todoList.querySelectorAll(selector);
  const itemsHeight = Array.from(items).reduce((sum, item) => (sum += item.offsetHeight), 0);
  items.forEach((item) => deleteTask(item));
  todoList.style.height = todoList.scrollHeight - itemsHeight + 'px';
  checkTodoList();
};

const changeTask = (task) => {
  task.textContent = checkValue(task.textContent);
  task.blur();
};

const loadTodo = () => {
  user.todoList.forEach((task) => createTask(task[0], task[1]));
  user.todoShow === 'done' ? toggleTodo() : checkTodoList();
};

const toggleTodo = () => {
  user.todoShow === 'done' ? todoList.classList.add('show-done') : todoList.classList.remove('show-done');
  checkTodoList();
};

const saveTodo = () => {
  user.todoList.length = 0;
  todoList.querySelectorAll('.todo-task').forEach((task) => {
    user.todoList.push([task.textContent, task.parentElement.classList.contains('done') ? 'done' : '']);
  });
  saveUser();
};

todoInput.addEventListener('change', addTask);

todo.addEventListener('click', (e) => {
  if (e.target.classList.contains('todo-check-button')) toggleTask(e.target.parentElement);
  if (e.target.classList.contains('todo-delete-button')) deleteTask(e.target.parentElement);
  if (e.target.classList.contains('todo-clear-button')) clearList();
});

todo.addEventListener('keydown', (e) => {
  if (!e.target.classList.contains('todo-task')) return;
  if (e.key === 'Enter' || e.key === 'Escape') changeTask(e.target);
});

// window.addEventListener('beforeunload', saveTodo);

export { loadTodo, toggleTodo };
