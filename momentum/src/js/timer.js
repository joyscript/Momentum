import { user } from './user.js';
import { showBackground } from './slider.js';
import { timesOfDay, getPartOfDay, getTimeOfDay, checkValue } from './common.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name-input');
const double = document.querySelector('.double');
const greeting = document.querySelector('.greeting');

const locale = { en: 'en-US', ru: 'ru-RU' };
const placeholder = { en: '[Enter name]', ru: '[Введите имя]' };
const greetingsRU = ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'];

const showTime = () => {
  const nowString = new Date().toLocaleTimeString('en-GB');
  time.textContent = nowString;
  if (nowString === '00:00:00') showDate();
  if (nowString.match(/^(00|06|12|18):00:00$/)) {
    showGreeting();
    if (timesOfDay.includes(user.photoTag)) user.photoTag = getTimeOfDay();
    showBackground();
  }
};

const showDate = () => {
  date.textContent = new Date().toLocaleDateString(locale[user.lang], { weekday: 'long', month: 'long', day: 'numeric' });
};

const showGreeting = () => {
  greeting.textContent = user.lang == 'en' ? `Good ${getTimeOfDay()},` : greetingsRU[getPartOfDay()];
};

const showName = () => (user.name ? showValue() : showPlaceholder());

const showValue = () => (double.textContent = name.value = user.name);

const showPlaceholder = () => {
  double.textContent = name.placeholder = placeholder[user.lang];
  double.style.minWidth = double.offsetWidth + 'px';
};

const changeName = () => {
  user.name = double.textContent = name.value = checkValue(name.value);
  user.name ? (double.style.minWidth = '') : showPlaceholder();
};

const decorateTimer = () => (time.dataset.effect = user.effect);

const showDateAndGreeting = () => {
  showDate();
  showName();
  showGreeting();
  decorateTimer();
};

const showTimeAndGreeting = () => {
  showTime();
  showDateAndGreeting();
  setInterval(showTime, 1000);
};

// -------------------------------------------

name.addEventListener('input', () => (double.textContent = name.value));
name.addEventListener('change', changeName);
name.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'Escape') e.target.blur();
});

export { showDateAndGreeting, showTimeAndGreeting, decorateTimer };
