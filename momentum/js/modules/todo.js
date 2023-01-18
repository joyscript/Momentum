import { user, saveUser } from './user.js';
import { checkValue } from './service.js';

const todo = document.querySelector('.todo');
const todoList = todo.querySelector('.todo-list');
const todoInput = todo.querySelector('.todo-input');

const createTask = (id) => {
  const element = document.createElement('div');
  element.classList.add('todo-item');
  if (user.todoList[id][1] === 'done') element.classList.add('done');
  element.innerHTML = `
    <button class="button todo-check-button"></button>
    <div class="todo-task-wrapper">
      <span class="todo-id">${id}:</span><span class="todo-task" contenteditable="true">${user.todoList[id][0]}</span>
    </div>
    <button class="button todo-delete-button"></button>
  `;
  todoList.append(element);
};

const checkTodoList = () => {
  todoList.querySelector('.todo-item') ? todoList.classList.remove('empty-all') : todoList.classList.add('empty-all');
  todoList.querySelector('.done') ? todoList.classList.remove('empty-done') : todoList.classList.add('empty-done');
};

const checkAndSave = () => {
  checkTodoList();
  saveUser();
};

const addTask = () => {
  const task = (todoInput.value = checkValue(todoInput.value));
  if (!task) {
    todoInput.blur();
    return;
  }
  user.todoList[user.todoID] = [task, user.todoShow === 'done' ? 'done' : ''];
  createTask(user.todoID++);
  todoInput.value = '';
  checkAndSave();
};

const toggleTask = (btn) => {
  btn.parentElement.classList.toggle('done');
  const taskID = parseInt(btn.nextElementSibling.textContent);
  user.todoList[taskID][1] = btn.parentElement.classList.contains('done') ? 'done' : '';
  checkAndSave();
};

const deleteTask = (btn) => {
  const taskID = parseInt(btn.previousElementSibling.textContent);
  delete user.todoList[taskID];
  setTimeout(() => {
    btn.parentElement.remove();
    checkAndSave();
  }, 100);
};

const changeTask = (task) => {
  const taskID = parseInt(task.previousElementSibling.textContent);
  user.todoList[taskID][0] = task.textContent = checkValue(task.innerText);
  task.blur();
  saveUser();
};

const loadTodo = () => {
  for (let taskID in user.todoList) createTask(taskID);
  user.todoShow === 'done' ? toggleTodo() : checkTodoList();
};

const toggleTodo = () => {
  if (user.todoShow === 'done') {
    todoList.style.minHeight = todoList.offsetHeight + 'px';
    todoList.classList.add('show-done');
  } else {
    todoList.style = '';
    todoList.classList.remove('show-done');
  }
  checkTodoList();
};

todoInput.addEventListener('change', addTask);

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('todo-check-button')) toggleTask(e.target);
  if (e.target.classList.contains('todo-delete-button')) deleteTask(e.target);
});

todoList.addEventListener('keydown', (e) => {
  if (!e.target.classList.contains('todo-task')) return;
  if (e.key === 'Enter' || e.key === 'Escape') changeTask(e.target);
});

export { loadTodo, toggleTodo };
