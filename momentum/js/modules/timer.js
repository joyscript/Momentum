export const timer = () => {
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');

  const getTime = () => new Date().toLocaleTimeString();

  const getDate = () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const showDate = () => (date.textContent = getDate());

  const showTime = () => {
    const now = getTime();
    time.textContent = now;
    if (now === '00:00:00') showDate();
  };

  showTime();
  showDate();
  setInterval(showTime, 1000);
};
