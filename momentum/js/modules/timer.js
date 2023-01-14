import { user, saveUser } from './user.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name');
const double = document.querySelector('.double');
const greeting = document.querySelector('.greeting');

const now = new Date();
const partOfDay = Math.floor(now.getHours() / 6);
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = timesOfDay[partOfDay];

const locale = { en: 'en-US', ru: 'ru-RU' };
const placeholder = { en: '[Enter name]', ru: '[Ваше имя]' };
const greetingsRU = ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'];

const showTime = () => {
  const nowString = new Date().toLocaleTimeString();
  time.textContent = nowString;
  if (nowString === '00:00:00') showDate();
  if (nowString.slice(0, 2) % 6 === 0) showGreeting();
};

const showDate = () => {
  date.textContent = now.toLocaleDateString(locale[user.lang], { weekday: 'long', month: 'long', day: 'numeric' });
};

const showGreeting = () => {
  greeting.textContent = user.lang == 'en' ? `Good ${timeOfDay},` : greetingsRU[partOfDay];
};

const showName = () => {
  user.name ? showValue() : showPlaceholder();
  setTimeout(() => double.classList.add('trans'), 600);
};

const showValue = () => (double.textContent = name.value = user.name);

const showPlaceholder = () => {
  double.textContent = name.placeholder = placeholder[user.lang];
  double.style.minWidth = double.offsetWidth + 'px';
};

const changeName = () => {
  name.value = name.value.trim().replace(/\s{1,}/g, ' ');
  name.value ? (double.style.minWidth = '') : showPlaceholder();
  user.name = name.value;
  saveUser();
};

const showTimeAndGreeting = () => {
  showTime();
  showDate();
  showName();
  showGreeting();
  setInterval(showTime, 1000);
};

name.addEventListener('input', () => (double.textContent = name.value));
name.addEventListener('change', changeName);
name.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 || e.keyCode === 27) e.target.blur();
});

export { showTimeAndGreeting, showDate, showGreeting, timeOfDay };
