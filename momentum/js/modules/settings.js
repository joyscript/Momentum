import { user, saveUser } from './user.js';
import { showDateAndGreeting, timeOfDay } from './timer.js';
import { checkValue } from './service.js';
import { showWeather } from './weather.js';
import { showCurQuote } from './quote.js';
import { showCurMantra } from './mantra.js';
import { showBackground } from './slider.js';
import { loadTodo, saveTodo, toggleTodo } from './todo.js';
import { changeTheme, saveColors } from './colors.js';

const menu = document.querySelector('.menu');
const blocks = document.querySelectorAll('[data-show]');
const modals = document.querySelectorAll('.modal');
const modalBtns = document.querySelectorAll('.modal-button');
const modalInputs = document.querySelectorAll('.modal-input');
const transItems = document.querySelectorAll('[data-trans]');
const menuParts = menu.querySelectorAll('.menu-part');
const tagsBlock = menu.querySelector('.tag-option');
const customBlock = menu.querySelector('.menu-custom');
const tagInput = menu.querySelector('.menu-tag-input');
const customBtn = menu.querySelector('.custom-button');
const menuError = menu.querySelector('.menu-error');
const todoClearBtn = document.querySelector('.todo-clear-button');

const transText = {
  language: ['Language', 'Язык'],
  photoSourse: ['Photo sourse', 'Фото ресурс'],
  photoTags: ['Photo tags', 'Фото тег'],
  showBlocks: ['Show / hide', 'Показать / скрыть'],
  autoslider: ['Autoslider', 'Автослайдер'],
  customColors: ['Сustomize colors', 'Настройте цвета'],
  copyColors: ['Copy these colors to your theme', 'Скопируйте цвета в свою тему'],
  activeColor: ['Active color', 'Активный цвет'],
  background: ['Modal background', 'Фон модальных окон'],
  bgOpacity: ['Background opacity', 'Прозрачность фона'],
  modalText: ['Modal text', 'Текст модальных окон'],
  btnText: ['Active button text', 'Текст активных кнопок'],
  theme: ['Theme', 'Тема'],
  effects: ['Effects', 'Эффекты'],

  general: ['General', 'Общее'],
  photo: ['Photo', 'Фото'],
  style: ['Style', 'Стиль'],
  en: ['English', 'Англ.'],
  ru: ['Russian', 'Русский'],
  time: ['Time', 'Время'],
  date: ['Date', 'Дата'],
  greeting: ['Name', 'Имя'],
  weather: ['Weather', 'Погода'],
  quote: ['Quote', 'Цитата'],
  player: ['Player', 'Плеер'],
  todo: ['Todo', 'Задачи'],
  mantra: ['Mantra', 'Мантра'],
  arrows: ['Arrows', 'Стрелочки'],
  allBlocks: ['Show all', 'Показать все'],
  slider: ['Autoslider', 'Автослайдер'],
  github: ['GitHub', 'GitHub'],
  unsplash: ['Unsplash', 'Unsplash'],
  flickr: ['Flickr', 'Flickr'],
  night: ['Night', 'Ночь'],
  morning: ['Morning', 'Утро'],
  afternoon: ['Afternoon', 'День'],
  evening: ['Evening', 'Вечер'],
  nature: ['Nature', 'Природа'],
  animals: ['Animals', 'Животные'],
  beauty: ['Beauty', 'Красота'],
  art: ['Art', 'Искусство'],
  cats: ['Cats', 'Котики'],
  custom: ['Your tag', 'Ваш тег'],
  dark: ['Dark', 'Темная'],
  light: ['Light', 'Светлая'],
  user: ['Custom', 'Личная'],
  all: ['All', 'Все'],
  done: ['Done', 'Выполнены'],
  clear: ['Clear list', 'Очистить'],
  todoText: ['No todos yet', 'Еще нет задач'],
  doneText: ['No completed todos', 'Нет выполненных задач'],
  enterTag: ['Enter your tag', 'Введите ваш тег'],
  tagInput: ['[Enter your tag]', '[Введите ваш тег]'],
  todoInput: ['[Enter new todo]', '[Введите новую задачу]'],
  errorFetch: [
    'Something went wrong. The API is not responding. Try again later.',
    'Что-то пошло не так. API не отвечает. Попробуйте позже.',
  ],
  errorTag: ['There are no images for this tag.<br>Enter another one.', 'Нет изображений по данному тегу.<br>Введите другой.'],
};

const changeCustomBlock = () => {
  user.photoSource === 'github' ? customBlock.classList.remove('active') : customBlock.classList.add('active');
};

const changeMenuPart = () => {
  menuParts.forEach((part) => {
    part.dataset.menu === user.menu ? part.classList.add('active') : part.classList.remove('active');
  });
};

const changeBtns = (option) => {
  modalBtns.forEach((btn) => {
    if ((option && btn.name !== option) || !btn.name) return;
    const isTrue = btn.name === 'showBlock' ? user.showBlock[btn.value] : btn.value === user[btn.name];
    isTrue ? btn.classList.add('active') : btn.classList.remove('active');
  });
};

const showBlocks = () => {
  blocks.forEach((block) => {
    user.showBlock[block.dataset.show] ? block.classList.add('show') : block.classList.remove('show');
  });
};

const renderError = () => {
  menuError.innerHTML = transText[user.tagMode === 'custom' ? 'errorTag' : 'errorFetch'][user.lang === 'en' ? 0 : 1];
};

const translate = () => {
  const ind = user.lang === 'en' ? 0 : 1;
  modalInputs.forEach((input) => (input.placeholder = transText[input.name][ind]));
  transItems.forEach((item) => (item.textContent = transText[item.dataset.trans][ind]));
  [...modalBtns, todoClearBtn].forEach((btn) => {
    if (btn === customBtn && btn.value !== 'custom') return;
    btn.textContent = transText[btn.value][ind];
  });
  renderError();
};

const setUserSettings = () => {
  changeCustomBlock(); // it's important to go first!
  changeMenuPart();
  changeBtns();
  showBlocks();
  translate();
  loadTodo();
  changeTheme();
  saveUser();
};

const changeLanguage = () => {
  translate();
  showDateAndGreeting();
  showWeather();
  showCurQuote();
  showCurMantra();
};

const resetError = () => {
  tagsBlock.classList.remove('error');
  tagInput.value = '';
  user.tagMode = '';
  saveUser();
};

const changePhotoSourse = () => {
  resetError();
  if (user.photoSource === 'github') {
    user.photoTag = timeOfDay;
    changeBtns('photoTag');
  }
  showBackground();
  changeCustomBlock();
};

const changePhotoTag = () => {
  resetError();
  showBackground();
};

const handleModalClicks = (e) => {
  if (!e.target.classList.contains('modal-button') || !e.target.name) return;

  const btn = e.target;
  btn.classList.toggle('active');

  if (btn.name === 'showBlock') {
    user.showBlock[btn.value] = btn.classList.contains('active');
    showBlocks();
  } else {
    user[btn.name] = btn.value;
    if (btn.name === 'menu') changeMenuPart();
    if (btn.name === 'lang') changeLanguage();
    if (btn.name === 'photoTag') changePhotoTag();
    if (btn.name === 'photoSource') changePhotoSourse();
    if (btn.name === 'todoShow') toggleTodo();
    if (btn.name === 'colorTheme') changeTheme();
    changeBtns(btn.name);
  }
  saveUser();
};

const toggleModal = (modal) => {
  modal.classList.toggle('open');
  document.body.classList.toggle('lock');

  const closeModal = (e) => {
    if (!e.target.closest(`.${modal.dataset.modal}`)) {
      modal.classList.remove('open');
      document.body.classList.remove('lock');
      document.body.removeEventListener('click', closeModal);
    }
  };

  if (modal.classList.contains('open')) document.body.addEventListener('click', closeModal);
};

const addCustomTag = () => {
  tagInput.value = checkValue(tagInput.value);
  if (!tagInput.value) return;
  user.tagMode = 'custom';
  showBackground(tagInput.value);
};

const animateInput = () => {
  tagInput.parentElement.classList.add('anim');
  setTimeout(() => (tagInput.value = ''), 250);
  setTimeout(() => tagInput.parentElement.classList.remove('anim'), 500);
};

const goAfterSuccess = () => {
  user.photoTag = user.customTag = tagInput.value;
  user.tagMode = '';
  changeCustomBlock(); // it's important to be in this place!
  changeBtns('photoTag');
  animateInput();
  saveUser();
};

const handleError = (err) => {
  if (user.tagMode !== 'custom') {
    user.photoSource = 'github';
    changePhotoSourse();
  }
  console.log(err);
  tagsBlock.classList.add('error');
  renderError();
};

const saveSettings = () => {
  saveTodo();
  saveColors();
  saveUser();
};

// -----------------------------------------------------------------------

modals.forEach((modal) => modal.addEventListener('click', handleModalClicks));

document.addEventListener('click', (e) => {
  if (e.target.closest('.modal-toggle-button')) {
    toggleModal(e.target.closest('.modal-toggle-button').parentElement);
  }
});

tagInput.addEventListener('change', () => {
  addCustomTag();
  tagInput.blur();
});

tagInput.addEventListener('input', () => tagInput.value === '' && tagsBlock.classList.remove('error'));

window.addEventListener('beforeunload', saveSettings);

export { setUserSettings, goAfterSuccess, handleError, toggleModal, changeBtns };
