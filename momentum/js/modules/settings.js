import { user, getUser, saveUser } from './user.js';
import { showDate, showGreeting } from './timer.js';
import { showWeather } from './weather.js';
import { showCurQuote } from './quote.js';
import { showBackground } from './slider.js';

const blocks = document.querySelectorAll('[id]');
const menu = document.querySelector('.menu');
const menuBtns = menu.querySelectorAll('.menu-button');
const menuToggleBtn = document.querySelector('.menu-toggle-button');

const changeBtns = (option) => {
  menuBtns.forEach((btn) => {
    if (btn.name !== option) return;
    const isTrue = btn.name === 'showBlock' ? user.showBlock[btn.value] : btn.value === user[btn.name];
    isTrue ? btn.classList.add('active') : btn.classList.remove('active');
  });
};

const showBlocks = () => {
  blocks.forEach((block) => {
    user.showBlock[block.id] ? block.classList.add('show') : block.classList.remove('show');
  });
};

const changeLanguage = () => {
  changeBtns('lang');
  showDate();
  showGreeting();
  showWeather();
  showCurQuote();
};

const changePhotoSourse = () => {
  changeBtns('photoSource');
  showBackground();
};

const setUserSettings = () => {
  getUser();
  changeBtns('lang');
  changeBtns('photoSource');
  changeBtns('showBlock');
  showBlocks();
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
    btn.name === 'lang' ? changeLanguage() : changePhotoSourse();
  }
  saveUser();
};

menu.addEventListener('click', handleClicks);
menuToggleBtn.addEventListener('click', toggleMenu);

export { setUserSettings, changePhotoSourse };
