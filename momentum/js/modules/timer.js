const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name');
const double = document.querySelector('.double');
const greeting = document.querySelector('.greeting');

const now = new Date();
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
const placeholders = ['[Enter name]', '[Ваше имя]'];

const showTime = () => {
  const nowString = new Date().toLocaleTimeString();
  time.textContent = nowString;
  if (nowString === '00:00:00') showDate();
  if (nowString.slice(0, 2) % 6 === 0) showGreeting();
};

const showDate = () => {
  date.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

const showGreeting = () => (greeting.textContent = `Good ${getTimeOfDay()},`);

const showName = () => {
  name.value = localStorage.getItem('name');
  name.value ? updateDouble() : showPlaceholder();
  setTimeout(() => double.classList.add('trans'), 600);
};

const updateDouble = () => (double.textContent = name.value);

const showPlaceholder = () => {
  double.textContent = name.placeholder = placeholders[0];
  double.style.minWidth = double.offsetWidth + 'px';
};

const updateName = () => {
  name.value = name.value.trim().replace(/\s{1,}/g, ' ');
  name.value ? (double.style.minWidth = '') : showPlaceholder();
};

name.addEventListener('input', updateDouble);
name.addEventListener('change', updateName);

export const getTimeOfDay = () => timesOfDay[Math.floor(now.getHours() / 6)];

export const timer = () => {
  showTime();
  showDate();
  showName();
  showGreeting();
  setInterval(showTime, 1000);
};
