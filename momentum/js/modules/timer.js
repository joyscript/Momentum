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
  setTimeout(() => double.classList.add('trans'), 600);
  checkValue();
};

const showPlaceholder = () => {
  double.textContent = name.placeholder = placeholders[0];
  double.style.minWidth = double.offsetWidth + 'px';
};

const showValue = () => {
  double.textContent = name.value;
  double.style = '';
};

const checkValue = () => (name.value ? showValue() : showPlaceholder());

name.addEventListener('input', () => (double.textContent = name.value));
name.addEventListener('change', () => {
  double.textContent = name.value = name.value.trim().replace(/\s{1,}/g, ' ');
  checkValue();
});

export const getTimeOfDay = () => timesOfDay[Math.floor(now.getHours() / 6)];

export const timer = () => {
  showTime();
  showDate();
  showName();
  showGreeting();
  setInterval(showTime, 1000);
};
