import { user } from './user.js';
import { showAnotherSlide } from './slider.js';

const autoslider = document.querySelector('.autoslider');
const autosliderBtn = autoslider.querySelector('.autoslider-button input');
const speedInput = autoslider.querySelector('.speed-input');
const unsplashBtn = document.querySelector('[value="unsplash"]');

let interval;

const playAutoslider = () => {
  changeState();

  const play = () => {
    showAnotherSlide(1);
    interval = setTimeout(play, user.sliderSpeed * 1000);
  };
  play();
};

const stopAutoslider = () => {
  changeState();
  clearInterval(interval);
};

const changeState = () => {
  autosliderBtn.checked ? document.body.classList.add('autoslider-play') : document.body.classList.remove('autoslider-play');
  unsplashBtn.disabled = autosliderBtn.checked;
  changeToggleBtnText();
};

const changeToggleBtnText = () => {
  const text = { en: ['Off', 'On'], ru: ['Выкл', 'Вкл'] };
  autosliderBtn.nextElementSibling.textContent = text[user.lang][autosliderBtn.checked ? 1 : 0];
};

const toggleAutoslider = () => {
  autosliderBtn.checked ? playAutoslider() : stopAutoslider();
};

const watchSpeedInput = () => {
  if (!speedInput.value.match(/^[0-9]{1,2}$/)) speedInput.value = speedInput.value.slice(0, -1);
};

const changeSpeedInputText = () => {
  speedInput.value = `${user.lang === 'en' ? 'Speed' : 'Скорость'}: ${user.sliderSpeed}s`;
};

const changeSpeed = () => {
  if (speedInput.value < 3) speedInput.value = 3;
  autosliderBtn.checked && stopAutoslider();
  user.sliderSpeed = +speedInput.value;
  autosliderBtn.checked && setTimeout(playAutoslider, 1000);
  speedInput.blur();
};

const changeAutosliderText = () => {
  changeToggleBtnText();
  changeSpeedInputText();
};

// ------------------------------------------------------

autosliderBtn.addEventListener('click', toggleAutoslider);

speedInput.addEventListener('focus', () => (speedInput.value = ''));
speedInput.addEventListener('blur', changeSpeedInputText);
speedInput.addEventListener('input', watchSpeedInput);
speedInput.addEventListener('change', changeSpeed);

export { changeAutosliderText };
