export const timer = () => {
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  const greeting = document.querySelector('.greeting');
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

  const now = new Date();

  const showDate = () => {
    date.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const showGreeting = () => {
    const partOfDay = Math.floor(now.getHours() / 6);
    greeting.textContent = `Good ${timesOfDay[partOfDay]},`;
  };

  const showTime = () => {
    const nowString = new Date().toLocaleTimeString();
    time.textContent = nowString;
    if (nowString === '00:00:00') showDate();
    if (nowString.slice(0, 2) % 6 === 0) showGreeting();
  };

  showTime();
  showDate();
  showGreeting();
  setInterval(showTime, 1000);
};
