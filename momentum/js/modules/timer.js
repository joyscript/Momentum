const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name');
const hidName = document.querySelector('.hid-name');
const greeting = document.querySelector('.greeting');

const now = new Date();
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

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
  hidName.textContent = name.value = localStorage.getItem('name');
  setTimeout(() => hidName.classList.add('trans'), 600);
  checkName();
};

const checkName = () => (name.value ? name.classList.add('filled') : name.classList.remove('filled'));

name.addEventListener('input', () => (hidName.textContent = name.value));
name.addEventListener('change', () => {
  hidName.textContent = name.value = name.value.trim().replace(/\s{1,}/g, ' ');
  checkName();
});

export const getTimeOfDay = () => timesOfDay[Math.floor(now.getHours() / 6)];

export const timer = () => {
  showTime();
  showDate();
  showName();
  showGreeting();
  setInterval(showTime, 1000);
};
