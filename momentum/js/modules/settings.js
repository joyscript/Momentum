import { user, saveUser, transText } from './user.js';
import { showDateAndGreeting, timeOfDay } from './timer.js';
import { showWeather } from './weather.js';
import { showCurQuote } from './quote.js';
import { showBackground } from './slider.js';
import { loadTodo, toggleTodo } from './todo.js';

const blocks = document.querySelectorAll('[id]');
const modals = document.querySelectorAll('.modal');
const modalBtns = document.querySelectorAll('.modal-button');
const modalInputs = document.querySelectorAll('.modal-input');
const transItems = document.querySelectorAll('[data-trans]');
const tagInput = document.querySelector('.menu-tag-input');
const menuToggleBtn = document.querySelector('.menu-toggle-button');
const todoToggleBtn = document.querySelector('.todo-toggle-button');

const changeBtns = (option) => {
  modalBtns.forEach((btn) => {
    if (option && btn.name !== option) return;
    const isTrue = btn.name === 'showBlock' ? user.showBlock[btn.value] : btn.value === user[btn.name];
    isTrue ? btn.classList.add('active') : btn.classList.remove('active');
  });
};

const changeTagInput = () => {
  tagInput.disabled = user.photoSource === 'github';
  if (user.photoSource === 'github') tagInput.value = '';
};

const translate = () => {
  const ind = user.lang === 'en' ? 0 : 1;
  modalBtns.forEach((btn) => (btn.textContent = transText[btn.value][ind]));
  modalInputs.forEach((input) => (input.placeholder = transText[input.name][ind]));
  transItems.forEach((item) => (item.textContent = transText[item.dataset.trans][ind]));
};

const showBlocks = () => {
  blocks.forEach((block) => {
    user.showBlock[block.id] ? block.classList.add('show') : block.classList.remove('show');
  });
};

const setUserSettings = () => {
  changeBtns();
  changeTagInput();
  showBlocks();
  translate();
  loadTodo();
};

const changeLanguage = () => {
  changeBtns('lang');
  translate();
  showDateAndGreeting();
  showWeather();
  showCurQuote();
};

const changePhotoSourse = () => {
  if (user.photoSource === 'github') {
    user.photoTag = timeOfDay;
    changeBtns('photoTag');
  }
  changeBtns('photoSource');
  changeTagInput();
  showBackground();
};

const changePhotoTag = (e) => {
  changeBtns('photoTag');
  showBackground();
};

const changeTodo = (e) => {
  changeBtns('todoShow');
  toggleTodo();
};

const handleModalClicks = (e) => {
  if (!e.target.classList.contains('modal-button')) return;

  const btn = e.target;
  btn.classList.toggle('active');

  if (btn.name === 'showBlock') {
    user.showBlock[btn.value] = btn.classList.contains('active');
    showBlocks();
  } else {
    user[btn.name] = btn.value;
    if (btn.name === 'lang') changeLanguage();
    if (btn.name === 'photoTag') changePhotoTag();
    if (btn.name === 'photoSource') changePhotoSourse();
    if (btn.name === 'todoShow') changeTodo();
  }
  saveUser();
};

const toggleModal = (modal, toggleBtn) => {
  document.body.classList.toggle(`${modal}-open`);

  const closeModal = (e) => {
    if (!e.target.closest(`.${modal}`) && e.target !== toggleBtn) document.body.classList.remove(`${modal}-open`);
  };

  document.body.classList.contains(`${modal}-open`)
    ? document.body.addEventListener('click', closeModal)
    : document.body.removeEventListener('click', closeModal);
};

modals.forEach((modal) => modal.addEventListener('click', handleModalClicks));
menuToggleBtn.addEventListener('click', () => toggleModal('menu', menuToggleBtn));
todoToggleBtn.addEventListener('click', () => toggleModal('todo', todoToggleBtn));

tagInput.addEventListener('change', (e) => {
  user.photoTag = e.target.value;
  changePhotoTag();
});

export { setUserSettings, changePhotoSourse };
