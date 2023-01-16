import { user, getUser, saveUser } from './user.js';
import { showDate, showGreeting, timeOfDay } from './timer.js';
import { showWeather } from './weather.js';
import { showCurQuote } from './quote.js';
import { showBackground } from './slider.js';

const blocks = document.querySelectorAll('[id]');
const menu = document.querySelector('.menu');
const tagInput = menu.querySelector('.menu-tag');
const switchBtns = menu.querySelectorAll('.menu-button.switch');
const showBtns = menu.querySelectorAll('.menu-button[name="showBlock"]');
const menuToggleBtn = document.querySelector('.menu-toggle-button');

const buttonLabels = {
  en: [
    'English',
    'Russian',
    'GitHub',
    'Unsplash',
    'Flickr',
    'night',
    'morning',
    'afternoon',
    'evening',
    'animals',
    'beauty',
    'Time',
    'Date',
    'Name',
    'Weather',
    'Quote',
    'Player',
  ],
  ru: [
    'Англ.',
    'Русский',
    'GitHub',
    'Unsplash',
    'Flickr',
    'ночь',
    'утро',
    'день',
    'вечер',
    'животные',
    'красота',
    'Время',
    'Дата',
    'Имя',
    'Погода',
    'Цитата',
    'Плеер',
  ],
};

const changeBtns = (option) => {
  switchBtns.forEach((btn) => {
    if (option && btn.name !== option) return;
    btn.value === user[btn.name] ? btn.classList.add('active') : btn.classList.remove('active');
  });
};

const changeShowBtns = () => {
  showBtns.forEach((btn) => {
    user.showBlock[btn.value] ? btn.classList.add('active') : btn.classList.remove('active');
  });
};

const translateBtns = () => {
  [...switchBtns, ...showBtns].forEach((btn, i) => (btn.textContent = buttonLabels[user.lang][i]));
};

const changeTagInput = () => {
  tagInput.placeholder = user.lang === 'en' ? 'Enter your tag' : 'Введите ваш тег';
  tagInput.disabled = user.photoSource === 'github';
  user.photoSource === 'github' && (tagInput.value = '');
};

const showBlocks = () => {
  blocks.forEach((block) => {
    user.showBlock[block.id] ? block.classList.add('show') : block.classList.remove('show');
  });
};

const setUserSettings = () => {
  getUser();
  changeBtns();
  changeShowBtns();
  changeTagInput();
  translateBtns();
  showBlocks();
};

const changeLanguage = () => {
  changeBtns('lang');
  changeTagInput();
  translateBtns();
  showDate();
  showGreeting();
  showWeather();
  showCurQuote();
};

const changePhotoSourse = () => {
  if (user.photoSource === 'github') user.photoTag = timeOfDay;
  changeBtns('photoTag');
  changeBtns('photoSource');
  changeTagInput();
  showBackground();
};

const changePhotoTag = (e) => {
  changeBtns('photoTag');
  showBackground();
};

const closeMenu = (e) => {
  if (!e.target.closest('.menu') && e.target !== menuToggleBtn) document.body.classList.remove('menu-open');
};

const toggleMenu = (e) => {
  document.body.classList.toggle('menu-open');
  document.body.classList.contains('menu-open')
    ? document.body.addEventListener('click', closeMenu)
    : document.body.removeEventListener('click', closeMenu);
};

const handleClicks = (e) => {
  if (!e.target.classList.contains('menu-button')) return;
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
  }
  saveUser();
};

menu.addEventListener('click', handleClicks);
menuToggleBtn.addEventListener('click', toggleMenu);

tagInput.addEventListener('change', (e) => {
  user.photoTag = e.target.value;
  changePhotoTag();
});

export { setUserSettings, changePhotoSourse };
