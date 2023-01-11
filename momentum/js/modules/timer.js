const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name');
const hidName = document.querySelector('.hid-name');
const greeting = document.querySelector('.greeting');

const now = new Date();
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
const placeHolders = ['[Enter name]', '[Ваше имя]'];

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
  setTimeout(() => hidName.classList.add('trans'), 600);
  checkValue();
};

const showPlaceholder = () => {
  hidName.textContent = name.placeholder = placeHolders[0];
  hidName.style.minWidth = hidName.offsetWidth + 'px';
};

const showValue = () => {
  hidName.textContent = name.value;
  hidName.style = '';
};

const checkValue = () => (name.value ? showValue() : showPlaceholder());

name.addEventListener('input', () => (hidName.textContent = name.value));
name.addEventListener('change', () => {
  hidName.textContent = name.value = name.value.trim().replace(/\s{1,}/g, ' ');
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
